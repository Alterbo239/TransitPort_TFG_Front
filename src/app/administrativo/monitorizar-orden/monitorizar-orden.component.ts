import { Component, OnInit, Renderer2 } from '@angular/core';
import { OrdenService } from '../../services/orden.service';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
// import { SuppliersService } from '../../services/data.service';
import { UsuarioService } from '../../services/usuario.service';
import { DataTablesModule  } from 'angular-datatables';
import Swal from 'sweetalert2';
import { response } from 'express';
import { data } from 'jquery';
import { error } from 'console';

@Component({
  selector: 'app-monitorizar-orden',
  templateUrl: './monitorizar-orden.component.html',
  styleUrl: './monitorizar-orden.component.css',
  imports: [CommonModule, DataTablesModule],
})

export class MonitorizarOrdenComponent implements OnInit{
  dtOptions: Config = {};

  constructor(
    private suppliersService: OrdenService,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.suppliersService.getOrden().subscribe(resp => {
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
        { title: 'Fecha creación', data: 'fecha_inicio' },
        { title: 'Orden', data: 'tipo', },
        { title: 'Estado', data: 'estado' },

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
        <h3>Codigo de la orden</h3>
        <input type="text" value="${data.id}" disabled>
        <br>
        <h3>Tipo de orden</h3>
        <input type="text" value="${data.tipo}" disabled>

        <h3>Cantidad contenedores</h3>
        <input type="text" value="${data.cantidad_contenedores}" disabled>
        <br>
        <h3>Estado</h3>
        <input class="${data.estado}" type="text" value="${data.estado}" disabled>
      `,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cerrar',

      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Actualizar',
          html: `
            <h3>ID Buque</h3>
            <input class="infoInput" id="id_buque" style="border: solid 1px black" type="text" value="${data.id_buque}">
            <br>
            <h3>ID Zona</h3>
            <input class="infoInput" id="id_zona" style="border: solid 1px black" type="text" value="${data.id_zona}">
            <br>
            <h3>ID Operador</h3>
            <input class="infoInput" id="id_operador" style="border: solid 1px black" type="text" value="${data.id_operador}">
          `,
          preConfirm: () => {
            let buque = (document.getElementById('id_buque') as HTMLInputElement).value;
            let zona = (document.getElementById('id_zona') as HTMLInputElement).value;
            let operador = (document.getElementById('id_operador') as HTMLInputElement).value;

            return Promise.all([
              this.suppliersService.validarBuque(buque).toPromise(),
              this.suppliersService.validarZona(zona).toPromise(),
              this.suppliersService.validarOperador(operador).toPromise()
            ]).then(([buqueValido, zonaValida, operadorValido]) => {
              console.log(buqueValido, zonaValida, operadorValido);
              if (buqueValido && zonaValida && operadorValido) {
                return { buque, zona, operador };
              } else {
                Swal.showValidationMessage('Uno o más campos no son válidos, asegúrate de que los datos sean correctos');
                return false;
              }
            });
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            let updatedData = {
              id: data.id,
              tipo: data.tipo,
              cantidad_contenedores: data.cantidad_contenedores,
              fecha_inicio: data.fecha_inicio,
              fecha_fin: data.fecha,
              estado: data.estado,
              id_administrativo: data.id_administrativo,
              id_buque: result.value.buque,
              id_zona: result.value.zona,
              id_operador: result.value.operador,
            };
            this.suppliersService.actualizarOrdenes(updatedData).subscribe(
              (response) => {
                Swal.fire('Orden actualizada correctamente', `Codigo orden ${updatedData.id}`, 'success')
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
      Swal.fire({
        title: "Filtrar",
        html: `
          <label for="selectTipo">Tipo</label><br>
          <select id="selectTipo" class="swal2-select">
            <option value="">Todos</option>
            <option value="carga">Carga</option>
            <option value="descarga">Descarga</option>
          </select><br><br>

          <label for="selectEstado">Estado</label><br>
          <select id="selectEstado" class="swal2-select">
            <option value="">Todos</option>
            <option value="Por empezar">Por empezar</option>
            <option value="En curso">En curso</option>
            <option value="Finalizada">Finalizada</option>
          </select><br><br>
        `,

        confirmButtonText: "Buscar",
        showCloseButton: true,
        customClass: {
          popup: "mi-popup2",
          title: "mi-titulo2",
          confirmButton: "mi-boton2",
          closeButton: "mi-cruz",
          htmlContainer: "misCosas"
        },

        preConfirm: () => {
          const estado = (document.getElementById("selectEstado") as HTMLSelectElement).value;
          const tipo = (document.getElementById("selectTipo") as HTMLSelectElement).value
          return { tipo, estado };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.filtrarOrdenes(result.value.tipo, result.value.estado);
        }
      });
    }

    filtrarOrdenes(tipo: string, estado: string) {
      const table = $('.dataTable').DataTable();

      if (tipo) {
        table.column(1).search(`^${tipo}$`, true, false);
      } else {
        table.column(1).search('');
      }

      if (estado) {
        table.column(2).search(`^${estado}$`, true, false);
      } else {
        table.column(2).search(''); //limpia el filtro si elegimos todos
      }

      table.draw(); //Refresca la tabla con los filtros
    }
  }
