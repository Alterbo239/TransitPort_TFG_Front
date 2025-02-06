import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { SuppliersService } from '../services/data.service';
import { Suppliers } from '../services/data.service';
import { Config } from 'datatables.net';


@Component({
  selector: 'app-prueba',
  imports: [DataTablesModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent implements OnInit{
  
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
      lengthMenu : [5,10,20,50],
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'Name', data: 'name' },
        { title: 'Contact Number', data: 'contactNumber' },
        {
          title: 'Actions',
          data: null,
          render: (data: any, type: any, row: any) => {
            return `<div>
                      <button class="btn btn-primary action-btn">View</button>
                    </div>`;
          },
          className: 'action-column'
        }
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        // Cast row to HTMLElement to access querySelector
        const rowElement = row as HTMLElement;
      
        // Ensure the last cell (Actions column) is styled
        const actionCell = rowElement.querySelector('td:last-child');
        if (actionCell) {
          actionCell.setAttribute(
            'style',
            'display: flex; justify-content: center; '
          );
        }
      
        // Find the button in the row and attach a click listener using Renderer2
        const actionButton = rowElement.querySelector('.action-btn');
        if (actionButton) {
          this.renderer.listen(actionButton, 'click', () => {
            console.log('Row data:', data); // Log the data for the clicked row
          });
        }
        return row;
      }
    };
  } 
}