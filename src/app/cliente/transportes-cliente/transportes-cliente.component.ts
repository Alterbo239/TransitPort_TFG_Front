import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { DataTablesModule  } from 'angular-datatables';
import Swal from 'sweetalert2';
import { BuquesService } from '../../services/buques.service';
import { AuthService } from '../../services/auth.service';
import { EmpresasService } from '../../services/empresas.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-transportes-cliente',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './transportes-cliente.component.html',
  styleUrl: './transportes-cliente.component.css'
})
export class TransportesClienteComponent  implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: BuquesService,
    private empresaService: EmpresasService,
    private usuario: AuthService,
    private actualUser: UsuarioService,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        const user = this.actualUser.getUsuario();
        this.suppliersService.getBuquesFiltrados(user.id).subscribe(resp => {
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
      searching: false,
      ordering: false,
      info: false,

      //Ubicacions de columnas y sus nombres
      columns: [
        { title: 'Nombre', data: 'nombre' },
        { title: 'Tipo', data: 'tipo' },
        { title: 'Empresa', data: 'empresas.nombre' },
      ],
      createdRow: function( row, data, dataIndex ) {
        // Cogemos el estado de la cita y lo ponemos en minusculas y le quitamos los espacios.
        const estado = (data as { tipo: string }).tipo;

        //Y agregamos la clase a la fila.
        row.classList.add(estado);
      },

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
      confirmButtonText: 'Confimar',
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
        `,
        showCloseButton: true,
        customClass: {
          popup: "mi-popup2",
          title: "mi-titulo2",
          confirmButton: "mi-boton2",
          closeButton: "mi-cruz",
          htmlContainer: "misCosas"
        },
        preConfirm: () => {
          const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
          return { tipo };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.filtrarIncidencia( result.value.tipo );
        }
      });
    });
  }

  filtrarIncidencia( tipo: string ) {
    const user = this.actualUser.getUsuario();
    // Volvemos a coger los datos de la base de datos.
    this.suppliersService.getBuquesFiltrados(user.id).subscribe(resp => {
      let datosFiltrados = resp.filter(datos => {
        // Filtramos los datos por cada columna, aunque no esté en la tabla.
        const filtroTipo = tipo ? datos.tipo === tipo : true;

        return filtroTipo;
      });

      // Por ultimo, actualizamos la tabla con los datos filtrados.
      const table = $('.dataTable').DataTable();
      table.clear();
      table.rows.add(datosFiltrados);
      table.draw();

    });
  }
}
