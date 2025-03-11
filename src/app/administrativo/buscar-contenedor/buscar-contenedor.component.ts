import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { ContenedorService } from '../../services/contenedor.service';
import { DataTablesModule  } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-contenedor',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './buscar-contenedor.component.html',
  styleUrl: './buscar-contenedor.component.css'
})
export class BuscarContenedorComponent implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: ContenedorService,
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
        { title: 'Contenedor', data: 'id_contenedor' },
        /* { title: 'Ubicacion actual', data: 'ubicacion', },
        { title: 'Destino', data: 'destino' }, */
        { title: 'Estado', data: 'estado' },
      ],
      columnDefs: [
        { 
          targets: 0,
          render: function(data) {
          return `ID del contenedor ${data}`;
        } }
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
          <h3>Codigo del Contenedor</h3>
          <input type="text" value="${data.id_contenedor}" disabled>
          <br>
          <h3>Ubicacion actual</h3>
          <input type="text" value="${data.ubicacion}" disabled>
          <br>
          <h3>Destino</h3>
          <input type="text" value="${data.destino}" disabled>
          <br>
          <h3>Estado</h3>
          <input class="${data.estado}" type="text" value="${data.estado}" disabled>
        `,      
        confirmButtonText: 'Aceptar',
      })
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
            <label for="selectUbicacion">Ubicacion</label><br>
            <select id="selectUbicacion" class="swal2-select">
              ${ubicaciones}
            </select><br><br>

            <label for="selectDestino">Destino</label><br>
            <select id="selectDestino" class="swal2-select">
              ${detinos}
            </select><br><br>

            <label for="selectEstado">Estado</label><br>
            <select id="selectEstado" class="swal2-select">
              <option value="">Todos</option>
              <option value="Por empezar">Por empezar</option>
              <option value="En curso">En curso</option>
              <option value="Finalizada">Finalizada</option>
            </select><br><br>                
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
            const ubicacion = (document.getElementById("selectUbicacion") as HTMLSelectElement).value;
            const destino = (document.getElementById("selectDestino") as HTMLSelectElement).value;
            const estado = (document.getElementById("selectEstado") as HTMLSelectElement).value;
            return { ubicacion, destino, estado };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.filtrarIncidencia(result.value.ubicacion, result.value.destino, result.value.estado);
          }
        });
      });
    }
  
    filtrarIncidencia(ubicacion: string, destino: string, estado: string) {
      // Volvemos a coger los datos de la base de datos.
      this.suppliersService.getSuppliersList().subscribe(resp => {
        let datosFiltrados = resp.filter(datos => {
          // Filtramos los datos por cada columna, aunque no esté en la tabla.
          const filtroUbicacion = ubicacion ? datos.ubicacion === ubicacion : true;
          const filtroDestino = destino ? datos.destino === destino : true;
          const filtroEstado = estado ? datos.estado === estado : true;
    
          return filtroUbicacion && filtroDestino && filtroEstado;
        });
    
        // Por ultimo, actualizamos la tabla con los datos filtrados.
        const tabla = $('.dataTable').DataTable();
        tabla.clear();
        tabla.rows.add(datosFiltrados);
        tabla.draw();
      });
    }
}
