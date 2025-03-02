import { Component, OnInit, Renderer2 } from '@angular/core';
import { OrdenService } from '../../services/orden.service';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { SuppliersService } from '../../services/data.service';
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
        this.suppliersService.getOrden().subscribe(resp => {
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
        { title: 'Fecha creación', data: 'fecha_inicio' },
        { title: 'Orden', data: 'tipo', },
        { title: 'Estado', data: 'estado' },

      ],
      rowCallback: (row: Node, data: any, index: number) => {

        const rowElement = row as HTMLElement;

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
