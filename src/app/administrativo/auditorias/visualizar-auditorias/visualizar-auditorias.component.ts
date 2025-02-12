import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { DataTablesModule  } from 'angular-datatables';
import { ajax } from 'jquery';
import { AuditoriaService } from '../../../services/auditoria.service';

@Component({
  selector: 'app-visualizar-auditorias',
  imports: [ CommonModule, DataTablesModule ],
  templateUrl: './visualizar-auditorias.component.html',
  styleUrl: './visualizar-auditorias.component.css'
})

export class VisualizarAuditoriasComponent implements OnInit{
  dtOptions: Config = {};
  dtOptions2: Config = {};

  constructor(
    private suppliersService: AuditoriaService,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.suppliersService.getSuppliersUp().subscribe(resp => {
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
        { title: 'Gruas', data: 'id_grua' },
        { title: 'Operador', data: 'tipo', },
        { title: 'Buque', data: 'id_buque' },
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

    this.dtOptions2 = {
      ajax: (dataTablesParameters: any, callback) => {
        this.suppliersService.getSuppliersDown().subscribe(resp => {
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
        { title: 'Orden', data: 'id' },
        { title: 'Tipo', data: 'tipo', },
        { title: 'Turno', data: 'turno' },
        { title: 'Estado', data: 'estado' },
        { title: 'Ver Historial', data: 'estado' },
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