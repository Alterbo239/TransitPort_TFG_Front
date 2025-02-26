import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { ContenedorService } from '../../services/contenedor.service';
import { DataTablesModule  } from 'angular-datatables';

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
        { title: 'ID', data: 'id_contenedor' },
        { title: 'Ubicacion actual', data: 'ubicacion', },
        { title: 'Destino', data: 'destino' },
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
