import { Component, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { Router, RouterModule} from '@angular/router';
import { SuppliersService } from '../../../data.service';
import { Suppliers } from '../../../data.service';
import { Config } from 'datatables.net';


@Component({
  selector: 'app-tabla-ordenes',
  standalone: true,
  imports: [DataTablesModule, RouterModule],
  templateUrl: './tabla-ordenes.component.html',
  styleUrls: ['./tabla-ordenes.component.css']
})
export class TablaOrdenesComponent implements OnInit{

  dtOptions: Config = {};

  constructor(
    private router: Router,
    private suppliersService: SuppliersService,
    private renderer: Renderer2){}

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
      lengthMenu : [4, 8, 12, 16],

      //cantidad máxima de datos que se muestran en la tabla
      scrollY: '600px',
      scrollCollapse: true,
      paging: false,
      autoWidth: false,
      destroy: true,
      retrieve: true,
      scrollX: true,



      //configuración de la tabla a español
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar  _MENU_',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ usuarios',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        },
        emptyTable: 'No hay datos disponibles en la tabla'
      },



      //tipos de columnas y sus nombres
      columns: [
        { title: 'Cargo', data: 'cargo' },
        { title: 'Nombre empleado', data: 'name' },
        { title: 'Estado', data: 'estado' },

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

  pulsarOrden(): void {
    this.router.navigate(['operador/orden']);
  }

}
