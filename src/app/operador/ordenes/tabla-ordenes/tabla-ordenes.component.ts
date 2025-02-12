import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { OrdenesService } from '../../../ordenes.service'; // Asegúrate de importar el servicio
import { NgModule } from '@angular/core';
// import { Suppliers } from '../../data.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-tabla-ordenes',
  imports: [DataTablesModule],
  templateUrl: './tabla-ordenes.component.html',
  styleUrl: './tabla-ordenes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TablaOrdenesComponent implements OnInit {

    dtOptions: Config = {};

      constructor(
        private suppliersService: OrdenesService
      ){}

      ngOnInit(): void {
        this.dtOptions = {
          ajax: (dataTablesParameters: any, callback) => {
            this.suppliersService.getSuppliersList().subscribe(resp => {
              callback({
                data: resp
              });
            });
          },

          //selección de cantidad de datos a mostrar en la tabla
          lengthMenu : [8],

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
            { title: 'Informacion', data: 'id_administrativo' },
            { title: 'Buque', data: 'id_buque', },
            { title: 'Tipo de orden', data: 'tipo' },

          ],
          rowCallback: (row: Node, data: any, index: number) => {

            let carga = '#040813';
            let descarga = '#89ADF0';

            const rowElement = row as HTMLElement;
            rowElement.style.borderLeft = data.tipo === 'Carga' ? `10px solid ${carga}` : `10px solid ${descarga}`;

          }

        };

      }

}


