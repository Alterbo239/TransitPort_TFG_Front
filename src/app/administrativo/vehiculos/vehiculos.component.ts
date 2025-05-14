import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { DataTablesModule  } from 'angular-datatables';
import Swal from 'sweetalert2';
import { BuquesService } from '../../services/buques.service';
import { AuthService } from '../../services/auth.service';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: BuquesService,
    private empresaService: EmpresasService,
    private usuario: AuthService,
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

      //Ubicacions de columnas y sus nombres
      columns: [
        { title: 'Nombre', data: 'nombre' },
        { title: 'Tipo', data: 'tipo' },
        { title: 'Empresa', data: 'empresas.nombre' },
      ],

      rowCallback: (row: Node, data: any, index: number) => {

        const rowElement = row as HTMLElement;

        if (rowElement) {
          this.renderer.listen(rowElement, 'click', () => {
            this.mostrarAlerta(data);
          });
        }
        return row;
      }
    };
  }

  mostrarAlerta(data: any) {
    Swal.fire({
      title: 'Detalles',
      html: `
        <h3>Nombre</h3>
        <p>Nombre del transporte</p>
        <input type="text" value="${data.nombre || ''}" disabled>
        <br>
        <h3>Tipo</h3>
        <p>Tipo del transporte</p>
        <input type="text" value="${data.tipo || ''}" disabled>
        <br>
        <h3>Empresa</h3>
        <p>Empresa a la que pertenece</p>
        <input type="text" value="${data.empresas?.nombre || ''}" disabled>
      `,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cerrar',

      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const empresas = await this.empresaService.getSuppliersList().toPromise();

        let opcionesEmpresas;

        if (empresas) {
          opcionesEmpresas = empresas.map(empresa => `
            <option value="${empresa.id}"> ${empresa.nombre} </option>
          `).join('');
        }

        Swal.fire({
          title: 'Actualizar',
          html: `
            <h3>Nombre</h3>
            <input class="infoInput" id="nombre" style="border: solid 1px black" type="text" value="${data.nombre || ''}">
            <br>
            <h3>Tipo</h3>
            <select id="tipo">
              <option value="buque">Buque</option>
              <option value="trailer">Trailer</option>
            </select>
            <br>
            <h3>Empresa</h3>
            <select class="infoInput" id="id_empresa">
              ${opcionesEmpresas || 'No hay zonas disponibles'}
            </select>
          `,
          preConfirm: () => {
            let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
            let tipo = (document.getElementById('tipo') as HTMLInputElement).value;
            let empresa = parseInt((document.getElementById('id_empresa') as HTMLInputElement).value);

            return Promise.all([
              this.suppliersService.validarEmpresa(empresa).toPromise()
            ]).then(([ empresaValida ]) => {
              console.log( empresaValida );
              if ( empresaValida ) {
                return { nombre, tipo, empresa };
              } else {
                Swal.showValidationMessage('Uno o más campos no son válidos, asegúrate de que los datos sean correctos');
                return false;
              }
            });
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            let id_administrativo = this.usuario.getUserID();

            let updatedData = {
              id: data.id,
              nombre: result.value.nombre,
              tipo: result.value.tipo,
              id_administrativo: id_administrativo,
              id_empresa: result.value.empresa,
            };
            console.log(updatedData);
            this.suppliersService.actualizarBuque(updatedData).subscribe(
              (response) => {
                Swal.fire('Transporte actualizada correctamente', `Codigo transporte ${updatedData.id}: ${updatedData.nombre}`, 'success')
                .then(() => {
                  window.location.reload();
                });
              }
            )
          }
        })
      }
    });
  }

  abrirFiltro() {
    //Cogemos la consulta de la base de datos.
    this.suppliersService.getSuppliersList().subscribe(async (resp: any[]) => {
      const empresas = await this.empresaService.getSuppliersList().toPromise();

      let opcionesEmpresas;

      if (empresas) {
        opcionesEmpresas = empresas.map(empresa => `
          <option value="${empresa.nombre}"> ${empresa.nombre} </option>
        `).join('');
      }

      Swal.fire({
        title: 'Filtrar',
        html: `
          <h3>Tipo</h3>
          <select id="tipo">
            <option value="">Todos</option>
            <option value="buque">Buque</option>
            <option value="trailer">Trailer</option>
          </select>
          <br>
          <h3>Empresa</h3>
          <select class="infoInput" id="id_empresa">
            <option value="">Todas</option>
            ${opcionesEmpresas || 'No hay zonas disponibles'}
          </select>
        `,
        confirmButtonText: "Buscar",
        showCloseButton: true,
        preConfirm: () => {
          const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
          const empresa = (document.getElementById("id_empresa") as HTMLSelectElement).value;
          return { tipo, empresa };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.filtrarIncidencia( result.value.tipo, result.value.empresa );
        }
      });
    });
  }

  filtrarIncidencia(tipo: string, empresa: string) {
    const table = $('.dataTable').DataTable();

    if (tipo) {
      table.column(1).search(tipo, false, false);
    } else {
      table.column(1).search('');
    }

    if (empresa) {
      table.column(2).search(`^${empresa}$`, true, false);
    } else {
      table.column(2).search(''); //limpia el filtro si elegimos todos
    }

    table.draw(); //Refresca la tabla con los filtros
  }
}
