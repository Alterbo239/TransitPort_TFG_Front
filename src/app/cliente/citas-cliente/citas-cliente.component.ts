import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { CitasService } from '../../services/citas.service';
import { DataTablesModule  } from 'angular-datatables';
import Swal from 'sweetalert2';
import { ZonasService } from '../../services/zonas.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-citas-cliente',
  imports: [ CommonModule, DataTablesModule ],
  templateUrl: './citas-cliente.component.html',
  styleUrl: './citas-cliente.component.css'
})
export class CitasClienteComponent implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: CitasService,
    private renderer: Renderer2,
    private user: UsuarioService
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        const user = this.user.getUsuario();
        this.suppliersService.getCitasCliente(user.id).subscribe(resp => {
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
      ordering: false,
      searching: false,
      info: false,

      //Ubicacions de columnas y sus nombres
      columns: [
        { title: 'Transporte', data: 'buques.nombre' },
        { title: 'Tipo', data: 'tipo' },
        { title: 'Fecha', data: 'fecha_asignada' }
      ],
      createdRow: function( row, data, dataIndex ) {
        // Cogemos el estado de la cita y lo ponemos en minusculas y le quitamos los espacios.
        const estado = (data as { estado: string }).estado.toLowerCase().replace(/\s+/g, '');

        //Y agregamos la clase a la fila.
        row.classList.add(estado);
      },
      columnDefs: [
        {
          targets: 2,
          render: function(data) {
            return data ? data : '----/--/--'; // Si data es "nulo", se muestra ese String.
          }
        },
      ],

      rowCallback: (row: Node, data: any, index: number) => {

        const rowElement = row as HTMLElement;

        const today = new Date();
        const date = new Date(data.fecha_asignada);

        if (date < today && data.fecha_asignada !== null) {
          $(rowElement).addClass('d-none'); // Si la fecha es anterior a la de hoy, no se muestra en la lista.
        } else if (rowElement) {
          this.renderer.listen(rowElement, 'click', () => {
            this.mostrarAlerta(data);
          });
        }

        return row;
      }
    };
  }

  mostrarAlerta(data: any) {
    let claseEstado = data.estado.toLowerCase().replace(/\s+/g, ''); //Filtramos los estados para que esten en minuscula y juntos para el nombre de la clase.
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
        <input class="${claseEstado}" type="text" value="${data.estado}" disabled>
      `,
      confirmButtonText: 'Confirmar',
    })
  }

  abrirFiltro() {
    //Cogemos la consulta de la base de datos.
    this.suppliersService.getSuppliersList().subscribe((resp: any[]) => {
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
          return { estado, tipo, fecha }; // Como son selects de datos validos, no los validamos antes de mandarlos.
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
        // Filtramos los datos por cada columna, aunque no esté en la tabla. (true = mostrarlo).
        const filtroEstado = estado ? datos.estado === estado : true;

        const filtroTipo = tipo ? datos.tipo === tipo : true;

        const filtroFecha = fecha ? datos.fecha_asignada >= fecha : true;

        return filtroEstado && filtroTipo && filtroFecha;
      });

      // Por ultimo, actualizamos la tabla con los datos filtrados.
      const table = $('.dataTable').DataTable();
      table.clear();
      table.rows.add(datosFiltrados);
      table.draw();

    });
  }
}
