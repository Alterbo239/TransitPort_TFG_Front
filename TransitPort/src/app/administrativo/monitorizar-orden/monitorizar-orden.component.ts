//VERSIÓN 2
import { Component, OnInit, Renderer2 } from '@angular/core';
import { OrdenService } from '../../orden.service';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { SuppliersService } from '../../data.service';
import { DataTablesModule  } from 'angular-datatables';

@Component({
  selector: 'app-monitorizar-orden',
  templateUrl: './monitorizar-orden.component.html',
  styleUrl: './monitorizar-orden.component.css',
  imports: [CommonModule, DataTablesModule],
})
export class MonitorizarOrdenComponent implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: OrdenService,
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


      // //configuración de la tabla a español
      // language: {
      //   search: 'Buscar:',
      //   lengthMenu: 'Mostrar  _MENU_',
      //   info: 'Mostrando _START_ a _END_ de _TOTAL_ usuarios',
      //   paginate: {
      //     first: 'Primero',
      //     last: 'Último',
      //     next: 'Siguiente',
      //     previous: 'Anterior'
      //   },
      //   emptyTable: 'No hay datos disponibles en la tabla'
      // },



      //tipos de columnas y sus nombres
      columns: [
        { title: 'Fecha creación', data: 'id' },
        { title: 'Orden', data: 'fecha_carga', },
        { title: 'Estado', data: 'cantidad_contenedores' },

      ],
      rowCallback: (row: Node, data: any, index: number) => {

        const rowElement = row as HTMLElement;

        //estilo de la tabla

        // const actionCell = rowElement.querySelector('table');
        // if (actionCell) {
        //   actionCell.setAttribute(
        //     'style',
        //     'display: flex; justify-content: center; '
        //   );
        // }

        const actionButton = rowElement.querySelector('.action-btn');
        if (actionButton) {
          this.renderer.listen(actionButton, 'click', () => {
            console.log('Row data:', data);
          });
        }
        return row;
      }
    };
  }
}