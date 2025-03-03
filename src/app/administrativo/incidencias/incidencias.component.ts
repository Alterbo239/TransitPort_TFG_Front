import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { DataTablesModule  } from 'angular-datatables';
import { OrdenService } from '../../services/orden.service';
import { relative } from 'node:path';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { response } from 'express';
import { error } from 'node:console';

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
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.suppliersService.getIncidencia().subscribe(resp => {
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
        
        if(data.codigo_tipo){
          rowElement.addEventListener('click', () => {
            this.mostrarAlerta(data);
          });          
        }
      }
    };
  }

  mostrarAlerta(data: any) {
    Swal.fire({
      title: 'Detalles',
      html: `
        <h3>Operador</h3>
        <input type="text" value="${data.id_operador}" disabled>
        <br>
        <h3>Orden</h3>
        <input type="text" value="${data.id_orden}" disabled>
        <br>
        <h3>Código Orden</h3>
        <input type="text" value="${data.codigo_tipo}" disabled>
        <br>
        <h3>Observaciones</h3>
        <textarea disabled> ${data.observacion}</textarea>
      `,      
      confirmButtonText: 'Resolver',
      cancelButtonText: 'Cancelar',

      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.suppliersService.borrarIncidencia(data.id.toString()).subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        )        
      }
    });
  }
}