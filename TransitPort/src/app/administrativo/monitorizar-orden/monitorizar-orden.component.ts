import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { OrdenService } from '../../orden.service';
import { Suppliers } from '../../orden.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-monitorizar-orden',
  imports: [ DataTablesModule ],
  templateUrl: './monitorizar-orden.component.html',
  styleUrl: './monitorizar-orden.component.css'
})
export class MonitorizarOrdenComponent implements OnInit {
  dtOptions: Config = {};

  constructor (
    private suppliersService: OrdenService,
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
        { title: 'Fecha creacion', data: 'fecha', render: function(data, type, row) {
          if (!data) return '';
          const date = new Date(data);
          return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric'});
        } },
        { title: 'Orden', data: 'orden' },
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
