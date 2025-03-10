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

  abrirFiltro() {
    Swal.fire({
      title: 'Filtrar',
      html: `
        <lable for="selectTipo">Tipo</lable><br>
        <select id="selectTipo" class="swal2-select">
          <option value="">Todos</option>
          <option value="grua">Grua</option>
          <option value="operador">Operador</option>
          <option value="buque">Buque</option>
          <option value="contenedor">Contenedor</option>
        </select><br><br>

        <lable for="selectOrden">Orden</lable><br>
        <select id="selectOrden" class="swal2-select">
          <option value="">Todos</option>
          <option value="carga">Carga</option>
          <option value="descarga">Descarga</option>
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
        const tipo = (document.getElementById("selectTipo") as HTMLSelectElement).value;
        const orden = (document.getElementById("selectOrden") as HTMLSelectElement).value;
        return { tipo, orden };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.filtrarIncidencia(result.value.tipo, result.value.orden);
      }
    });
  }

  filtrarIncidencia(tipo: string, orden: string) {
    const tabla = $('.dataTable').DataTable();

    if (tipo) {
      tabla.column(1).search(`^${tipo}$`, true, false);
    } else {
      tabla.column(1).search('');
    }

    if (orden) {
      tabla.column(3).search(`^${orden}$`, true, false);
    } else {
      tabla.column(3).search('');
    }

    tabla.draw();
  }
}