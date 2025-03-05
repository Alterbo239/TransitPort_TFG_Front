import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { UsuarioService } from '../../services/usuario.service';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  imports: [DataTablesModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  encapsulation: ViewEncapsulation.None
})

export class UsuariosComponent implements OnInit{

  selectedUsers: any[] = [];
  dtElement: any;
  dtOptions: Config = {};

  constructor(
    private usuarioService: UsuarioService,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.usuarioService.getPersonal().subscribe(resp => {
          callback({
            data: resp
          });
        });
      },

      //selección de cantidad de datos a mostrar en la tabla
      lengthMenu : [8],

      //cantidad máxima de datos que se muestran en la tabla
      scrollY: '400px',
      scrollCollapse:true,
      paging: false,


      //configuración de la tabla a español
      language: {
        search: '',
        searchPlaceholder: 'Búsqueda...',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ usuarios',
        infoFiltered: '(filtrado de _MAX_ usuarios totales)',
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
        { 
          title: 'Cargo', 
          data: 'cargo', 
          render: function (data, type, row) {
            return `<input type="checkbox" class="select-checkbox" data-id="${row.id}"> ${data}`;
          }
        },
        { title: 'Nombre', data: 'name' },
        { title: 'Estado', data: 'estado' }
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const rowElement = row as HTMLElement;
        const checkbox = rowElement.querySelector('.select-checkbox') as HTMLInputElement;
      
        if (checkbox) {
          this.renderer.listen(checkbox, 'change', (event) => {
            if (checkbox.checked) {
              this.selectedUsers.push(data.id);
            } else {
              this.selectedUsers = this.selectedUsers.filter(id => id !== data.id);
            }
          });
        }
        return row;
      }
      

    };

  }

  filtrarUsuarios(cargo: string, estado: string) {

    const table = $('.dataTable').DataTable();
  
    if (cargo) {
      table.column(0).search(cargo, false, false);
    } else {
      table.column(0).search('');
    }
  
    if (estado) {
      table.column(2).search(`^${estado}$`, true, false);
    } else {
      table.column(2).search(''); //limpia el filtro si elegimos todos
    }
  
    table.draw(); //Refresca la tabla con los filtros
  }

  abrirFiltro() {
    Swal.fire({
      title: "Filtrar Usuarios",
      html: `
        <label for="selectCargo">Cargo:</label>
        <select id="selectCargo" class="swal2-select">
          <option value="">Todos</option>
          <option value="gestor">Gestor</option>
          <option value="administrativo">Administrativo</option>
          <option value="operador">Operador</option>
        </select>
  
        <label for="selectEstado" style="margin-top:10px;">Estado:</label>
        <select id="selectEstado" class="swal2-select">
          <option value="">Todos</option>
          <option value="Activo/a">Activo</option>
          <option value="Inactivo/a">Inactivo</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Buscar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const cargo = (document.getElementById("selectCargo") as HTMLSelectElement).value;
        const estado = (document.getElementById("selectEstado") as HTMLSelectElement).value;
        return { cargo, estado };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.filtrarUsuarios(result.value.cargo, result.value.estado);
      }
    });
  }
  

  modificarEstado() {

    if (this.selectedUsers.length === 0) {
      Swal.fire("Selecciona al menos un usuario", "", "warning");
      return;
    }
  
    Swal.fire({
      title: "Modificar Estado",
      text: "Selecciona el nuevo estado para los usuarios seleccionados:",
      input: "select",
      inputOptions: {
        "Activo/a": "Activo/a",
        "Inactivo/a": "Inactivo/a",
      },
      inputPlaceholder: "Seleccione un estado",
      showCancelButton: true,
      confirmButtonText: "Modificar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.actualizarEstadoUsuarios(result.value);
      }
    });
  }

  actualizarEstadoUsuarios(estado: string) {

    //no puede utilizar el boton sin seleccionar al menos uno
    if (this.selectedUsers.length === 0) {
      Swal.fire("Selecciona al menos un usuario", "", "warning");
      return;
    }
  
    //array de usuarios seleccionados
    const updateRequests = this.selectedUsers.map(id => 
      this.usuarioService.modificarEstadoUsuario(id, estado).toPromise()
    );
  
    //procesamos varios usuarios a la vez
    Promise.all(updateRequests)
      .then(() => {
        Swal.fire("Estados actualizados", "", "success");
        this.selectedUsers = []; //limpio el array
        this.recargarTabla();
      })
      .catch(() => {
        Swal.fire("Error al actualizar estados", "", "error");
      });
  }
  
  //permite recargar la tabla al actualizar los usuarios
  recargarTabla() {
    $('.dataTable').DataTable().ajax.reload(undefined, false);
  }
  
  
  

}
