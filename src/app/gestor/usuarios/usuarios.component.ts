import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
<<<<<<< HEAD
import { SuppliersService } from '../../services/data.service';
// import { Suppliers } from '../../data.service';
=======
import { SuppliersService } from '../../data.service';
>>>>>>> fe0327be2cae4caf4e453fd0dd4b51a25f32531e
import { Config } from 'datatables.net';

@Component({
  selector: 'app-usuarios',
  imports: [DataTablesModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  encapsulation: ViewEncapsulation.None
})

export class UsuariosComponent implements OnInit{

  dtOptions: Config = {};

  constructor(
    private suppliersService: SuppliersService,
    private renderer: Renderer2
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
        { title: 'Cargo', data: 'usuario' },
        { title: 'Nombre', data: 'nombre', },
        { title: 'Estado', data: 'password' },

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
