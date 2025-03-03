import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { DataTablesModule  } from 'angular-datatables';
import { OrdenService } from '../../services/orden.service';

@Component({
  selector: 'app-incidencias',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent implements OnInit{
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
        { title: 'Codigo', data: 'codigo_tipo' },
        { title: 'Incidencia', data: 'tipo', },
        { title: 'Operador', data: 'id_operador' },
        { title: 'Orden asociada', data: 'id_orden' },
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