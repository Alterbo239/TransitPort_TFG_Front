import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { CitasService } from '../../services/citas.service';
import { DataTablesModule  } from 'angular-datatables';
import Swal from 'sweetalert2';
import { ZonasService } from '../../services/zonas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: CitasService,
    private zonasService: ZonasService,
    private usuario: AuthService,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.suppliersService.getSuppliersList().subscribe(resp => {
          console.log(resp);
          callback({
            data: resp
          });
        });
      },

      //selección de cantidad de datos a mostrar en la tabla
      lengthMenu : [4, 8],

      //cantidad máxima de datos que se muestran en la tabla
      scrollY: '600px',
      scrollCollapse:true,
      paging: false,

      //Ubicacions de columnas y sus nombres
      columns: [
        { title: 'Transporte', data: 'buques.nombre' },
        { title: 'Tipo de operacion', data: 'tipo' },
        { title: 'Fecha Solicitada', data: 'fecha_pedida' },
        { title: 'Fecha Asignada', data: 'fecha_asignada' },
        { title: 'Estado', data: 'estado' },
      ],
      columnDefs: [
        {
          targets: 4,
          createdCell: function(td, cellData) {
            const estado = cellData.toLowerCase().replace(/\s+/g, '');
            $(td).addClass(estado);
          },
        },
        {
          targets: 3,
          render: function(data) {
            return data ? data : '----/--/--';
          }
        }
      ],

      rowCallback: (row: Node, data: any, index: number) => {

        const rowElement = row as HTMLElement;

        if (rowElement) {
          this.renderer.listen(rowElement, 'click', () => {
            this.mostrarAlerta(data);
          });
        }
        return row;
      }
    };
  }

  mostrarAlerta(data: any) {
    Swal.fire({
      title: 'Detalles',
      html: `
        <h3>Fecha</h3>
        <p>Fecha asignada</p>
        <input type="text" value="${data.fecha_asignada || ''}" disabled>
        <br>
        <h3>Hora</h3>
        <p>Hora de llegada</p>
        <input type="text" value="${data.hora || ''}" disabled>
        <br>
        <h3>Zona</h3>
        <p>Amarre del transporte</p>
        <input type="text" value="${data.zonas?.nombre || ''}" disabled>
        <br>
        <h3>Estado</h3>
        <input class="${data.estado}" type="text" value="${data.estado}" disabled>
      `,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cerrar',

      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const zonas = await this.zonasService.getSuppliersList().toPromise();

        let opcionesZonas;

        if (zonas) {
          opcionesZonas = zonas.map(zona => `
            <option value="${zona.id}"> ${zona.nombre} </option>
          `).join('');
        }

        Swal.fire({
          title: 'Actualizar',
          html: `
            <h3>Fecha</h3>
            <input class="infoInput" id="fecha" style="border: solid 1px black" type="date" value="${data.fecha_asignada || ''}">
            <br>
            <h3>Hora</h3>
            <p>Hora</p>
            <input class="infoInput" id="hora" style="border: solid 1px black" type="time" value="${data.hora || ''}">
            <br>
            <h3>Zona</h3>
            <p>Zona</p>
            <select class="infoInput" id="id_zona">
              ${opcionesZonas || 'No hay zonas disponibles'}
            </select>
          `,
          preConfirm: () => {
            let fecha = (document.getElementById('fecha') as HTMLInputElement).value;
            let hora = (document.getElementById('hora') as HTMLInputElement).value;
            let zona = parseInt((document.getElementById('id_zona') as HTMLInputElement).value);

            const fecha_ingresada = new Date(fecha);
            const today = new Date();

            return Promise.all([
              this.suppliersService.validarZona(zona).toPromise()
            ]).then(([ zonaValida ]) => {
              if ( !zonaValida || fecha_ingresada <= today) {
                Swal.showValidationMessage('Uno o más campos no son válidos, asegúrate de que los datos sean correctos');
                return false;
              } else {
                return { fecha, hora, zona };
              }
            });
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            let id_administrativo = this.usuario.getUserID();

            let updatedData = {
              id: data.id,
              tipo: data.tipo,
              fecha_pedida: data.fecha_pedida,
              fecha_asignada: result.value.fecha,
              hora: result.value.hora,
              estado: 'Completada',
              id_administrativo: id_administrativo || null,
              id_cliente: data.id_cliente,
              id_buque: data.id_buque,
              id_zona: result.value.zona,
            };
            this.suppliersService.actualizarCita(updatedData).subscribe(
              (response) => {
                Swal.fire('Orden actualizada correctamente', `Codigo orden ${updatedData.id}`, 'success')
                .then(() => {
                  window.location.reload();
                });
              }
            )
          }
        })
      }
    });
  }

  abrirFiltro() {
    //Cogemos la consulta de la base de datos.
    this.suppliersService.getSuppliersList().subscribe((resp: any[]) => {
      const ubis = [...new Set(resp.map(datos => datos.ubicacion))]; //Creamos un map para evitar que se repitan datos.
      let ubicaciones = `<option value="">Todos</option>`; //Creamos el select con las ubicaciones.
      ubis.forEach(ubicacion => {
        ubicaciones += `<option value="${ubicacion}">${ubicacion}</option>`; //Agregamos las opciones de ubicaciones.
      });

      //Lo mismo pero con los destinos.
      const dest = [...new Set(resp.map(datos => datos.destino))];
      let detinos = `<option value="">Todos</option>`;
      dest.forEach(destino => {
        detinos += `<option value="${destino}">${destino}</option>`;
      });

      Swal.fire({
        title: 'Filtrar',
        html: `
        <label for="selectEstado">Estado</label><br>
        <select id="selectEstado" class="swal2-select">
          <option value="">Todos</option>
          <option value="En revision">En revision</option>
          <option value="Completada">Completada</option>
        </select>
        <br><br>

        <label for="selectTipo">Tipo</label><br>
        <select id="selectTipo" class="swal2-select">
          <option value="">Todos</option>
          <option value="carga">carga</option>
          <option value="descarga">descarga</option>
        </select>
        <br><br>

        <label for="selectFecha">Fecha asignada</label><br>
        <input id="selectFecha" type="date">
        <br><br>
        `,
        confirmButtonText: "Buscar",
        showCloseButton: true,
        customClass: {
          popup: "mi-popup2",
          title: "mi-titulo2",
          confirmButton: "mi-boton2",
          closeButton: "mi-cruz",
          htmlContainer: "misCosas"
        },
        preConfirm: () => {
          const estado = (document.getElementById("selectEstado") as HTMLSelectElement).value;
          const tipo = (document.getElementById("selectTipo") as HTMLSelectElement).value;
          const fecha = (document.getElementById("selectFecha") as HTMLSelectElement).value;
          return { estado, tipo, fecha };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.filtrarIncidencia(result.value.estado, result.value.tipo, result.value.fecha);
        }
      });
    });
  }

  filtrarIncidencia(estado: string, tipo: string, fecha: string) {
    // Volvemos a coger los datos de la base de datos.
    this.suppliersService.getSuppliersList().subscribe(resp => {
      let datosFiltrados = resp.filter(datos => {
        // Filtramos los datos por cada columna, aunque no esté en la tabla.
        const filtroEstado = estado ? datos.estado === estado : true;

        const filtroFecha = fecha ? datos.fecha_asignada >= fecha : true;

        return filtroEstado && filtroFecha;
      });

      // Por ultimo, actualizamos la tabla con los datos filtrados.
      const table = $('.dataTable').DataTable();
      table.clear();
      table.rows.add(datosFiltrados);

      if (tipo) {
        table.column(1).search(`^${tipo}$`, true, false);
      } else {
        table.column(1).search('');
      }

      table.draw();
    });
  }
}
