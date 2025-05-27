import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DataTablesModule  } from 'angular-datatables';
import { EmpresasService } from '../../services/empresas.service';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { text } from 'node:stream/consumers';

@Component({
  selector: 'app-empresas',
  imports: [ DataTablesModule ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css',
  encapsulation: ViewEncapsulation.None
})
export class EmpresasComponent implements OnInit{

  selectedUsers: any[] = [];
  dtElement: any;
  dtOptions: Config = {};

  constructor(
    private empresaService: EmpresasService,
    private usuario: AuthService,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.empresaService.getSuppliersList().subscribe(resp => {
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
        info: 'Mostrando _START_ a _END_ de _TOTAL_ empresas',
        infoFiltered: '(filtrado de _MAX_ empresas totales)',
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
        { title: 'Nombre', data: 'nombre' },
        { title: 'Ciudad', data: 'ciudad' },
        { title: 'CIF', data: 'cif' },
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const rowElement = row as HTMLElement;

        // Evento para mostrar los detalles del usuario, pero solo si NO se hace clic en el checkbox
        this.renderer.listen(rowElement, 'click', (event) => {
          if (!(event.target as HTMLElement).classList.contains('select-checkbox')) {
            this.mostrarDetallesUsuario(data);
          }
        });

        return row;
      }


    };

  }

  mostrarDetallesUsuario(empresa: any) {
    Swal.fire({
      title: 'Detalles',
      html: `
        <p><span style="text-decoration: underline">${empresa.nombre}</span> </p><br>

        <div class="div1">
          <label for="ciudad"><span>Ciudad</span></label><br>
          <input id="ciudad" class="swal2-input" type="text" value="${empresa.ciudad}" readonly><br>

          <label for="codigoPostal"><span>Código Postal</span></label><br>
          <input id="codigoPostal" class="swal2-input" type="text" value="${empresa.codigo_postal}" readonly><br>

          <label for="cif"><span>CIF</span></label><br>
          <input id="cif" class="swal2-input" type="cif" value="${empresa.cif}" readonly><br>

          <label for="email"><span>Email</span></label><br>
          <input id="email" class="swal2-input" type="email" value="${empresa.email}" readonly><br>
        </div>
      `,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cerrar',

      showCancelButton: true,
      showCloseButton: true,

      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "mi-boton",
        cancelButton: "mi-boton-cancelar",
        closeButton: "mi-cruz",
        htmlContainer: "misCosas2"
      }
    }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Actualizar',
              html: `
                <h3>Nombre</h3>
                <input class="infoInput" id="nombre" style="border: solid 1px black" type="text" value="${empresa.nombre || ''}">
                <br>
                <h3>Ciudad</h3>
                <input class="infoInput" id="ciudad" style="border: solid 1px black" type="text" value="${empresa.ciudad || ''}">
                <br>
                <h3>Codigo Postal</h3>
                <input class="infoInput" id="codigo_postal" style="border: solid 1px black" type="text" value="${empresa.codigo_postal || ''}">
                <br>
                <h3>CIF</h3>
                <input class="infoInput" id="cif" style="border: solid 1px black" type="text" value="${empresa.cif || ''}">
                <br>
                <h3>Email</h3>
                <input class="infoInput" id="email" style="border: solid 1px black" type="email" value="${empresa.email || ''}">
                <br>
              `,
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
                confirmButton: "mi-boton2",
                closeButton: "mi-cruz",
                htmlContainer: "misCosas"
              },
              preConfirm: () => {
                let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
                let ciudad = (document.getElementById('ciudad') as HTMLInputElement).value;
                let codigo_postal = (document.getElementById('codigo_postal') as HTMLInputElement).value;
                let cif = (document.getElementById('cif') as HTMLInputElement).value;
                let email = (document.getElementById('email') as HTMLInputElement).value;

                let dataValida = false;

                // Comprobamos que estos datos cumplen los requisitos.
                const codigoPostalValido = /^\d{5}$/.test(codigo_postal);
                const cifValido = /^\d{8}[A-Za-z]$/.test(cif);
                const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

                // Validando los datos -> .
                if ( nombre && ciudad && codigoPostalValido && cifValido && emailValido ) {
                  dataValida = true;
                }

                if ( dataValida ) {
                  return { nombre, ciudad, codigo_postal, cif, email };
                } else {
                  Swal.showValidationMessage('Uno o más campos no son válidos, asegúrate de que los datos sean correctos');
                  return false;
                }
              }
            }).then((result) => {
              if (result.isConfirmed && result.value) {
                let id_gestor = this.usuario.getUserID();

                let updatedData = {
                  id: empresa.id,
                  nombre: result.value.nombre,
                  ciudad: result.value.ciudad,
                  codigo_postal: result.value.codigo_postal,
                  cif: result.value.cif,
                  email: result.value.email,
                  id_gestor: id_gestor,
                };
                console.log(updatedData);
                this.empresaService.actualizarEmpresa(updatedData).subscribe(
                  (response) => {
                    Swal.fire({
                      title: 'Empresa actualizada correctamente',
                      text: `Empresa ${updatedData.id}: ${updatedData.nombre}`,
                      icon: 'success',
                      customClass: {
                        confirmButton: 'ok-success',
                      }
                    })
                    .then(() => {
                      window.location.reload();
                    });
                  }
                )
              }
            })
          }
        });;
  }

  async abrirFiltro() {
    const ciudades = await this.empresaService.getCiudades().toPromise();

    let opcionesCiudades;

    if (ciudades) {
      opcionesCiudades = ciudades.map(ciudad => `
        <option value="${ciudad}"> ${ciudad} </option>
      `);
    }

    Swal.fire({
      title: "Filtrar",
      html: `
        <label for="selectCiudad">Ciudad</label><br>
        <select id="selectCiudad" class="swal2-select">
          <option value="">Todos</option>
          ${opcionesCiudades || 'Nada'}
        </select><br><br>
      `,
      confirmButtonText: "Buscar",
      showCloseButton: true,
      customClass: {
        popup: "mi-popup2",
        title: "mi-titulo2",
        confirmButton: "mi-boton2",
        closeButton: "mi-cruz2",
        htmlContainer: "misCosas"
      },
      preConfirm: () => {
        const ciudad = (document.getElementById("selectCiudad") as HTMLSelectElement).value;
        return { ciudad };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.filtrarUsuarios(result.value.ciudad);
      }
    });
  }

  filtrarUsuarios(ciudad: string) {
    const table = $('.dataTable').DataTable();

    if (ciudad) {
      table.column(1).search(ciudad, false, false);
    } else {
      table.column(1).search('');
    }

    table.draw(); //Refresca la tabla con los filtros
  }

  //permite recargar la tabla al actualizar los usuarios
  recargarTabla() {
    $('.dataTable').DataTable().ajax.reload(undefined, false);
  }
}
