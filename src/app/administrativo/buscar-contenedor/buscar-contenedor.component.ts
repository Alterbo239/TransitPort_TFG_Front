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

      //tipos de columnas y sus nombres
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
}
