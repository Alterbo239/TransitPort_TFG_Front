import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { SuppliersService } from '../../data.service';
import { Suppliers } from '../../data.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-usuarios',
  imports: [DataTablesModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
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

      lengthMenu : [4, 8, 12, 16],
      columns: [
        { title: 'Cargo', data: 'cargo' },
        { title: 'Nombre empleado', data: 'name' },
        { title: 'Estado', data: 'estado' },

      ],
      rowCallback: (row: Node, data: any, index: number) => {

        const rowElement = row as HTMLElement;

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
