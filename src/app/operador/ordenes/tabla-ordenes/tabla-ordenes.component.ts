import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { OrdenesService } from '../../../services/ordenes.service';
import { NgModule } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
// import { Suppliers } from '../../data.service';
import { Config } from 'datatables.net';
import { OrdenComponent } from '../orden/orden.component';
import { UsuarioService } from '../../../services/usuario.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-tabla-ordenes',
  imports: [DataTablesModule],
  templateUrl: './tabla-ordenes.component.html',
  styleUrl: './tabla-ordenes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TablaOrdenesComponent implements OnInit {

    usuarioId: any;
    usuario: any;

    dtOptions: Config = {};

      constructor(
        private suppliersService: OrdenesService,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UsuarioService
      ){}

      ngOnInit(): void {

        this.usuario = this.userService.getUsuario();

        console.log(this.usuario);

        this.usuarioId = this.usuario.id;

        console.log('Hola: ' + this.usuarioId);

        this.dtOptions = {
          ajax: (dataTablesParameters: any, callback) => {
            this.suppliersService.getSuppliersList(this.usuarioId).subscribe(
              resp => {
                callback({
                  data: resp
                });
              },
              error => {
                console.error('Error:', error);
              });
          },

          //selección de cantidad de datos a mostrar en la tabla
          lengthMenu : [7],

          //cantidad máxima de datos que se muestran en la tabla
          scrollY: '450px',
          scrollCollapse:true,
          paging: false,

          //tipos de columnas y sus nombres
          columns: [
            { title: 'Tipo de orden', data: 'tipo' },
            { title: 'Buque', data: 'buque.nombre', },
            { title: 'Zona', data: 'zona.ubicacion' },

          ],
          rowCallback: (row: Node, data: any, index: number) => {

            let carga = '#040813';
            let descarga = '#89ADF0';

            const rowElement = row as HTMLElement;

            if(data.estado == 'En curso'){

              rowElement.style.borderLeft = '10px solid #FACD84';

            } else if(data.estado == 'Por empezar'){
            rowElement.style.borderLeft = data.tipo === 'Carga' ? `10px solid ${carga}` : `10px solid ${descarga}`;
            rowElement.style.borderLeft = data.tipo === 'carga' ? `10px solid ${carga}` : `10px solid ${descarga}`;
            }

            if(data.id){
                rowElement.addEventListener('click', () => {
                setTimeout(() => {
                  this.router.navigate(['orden', data.id], { relativeTo: this.route });
                  });
                });

              }

          }

        };

      }
}


