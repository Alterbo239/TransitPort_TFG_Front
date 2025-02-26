import { Component } from '@angular/core';
import { RouterModule, Route, ActivatedRoute, Router } from '@angular/router';
import { IncidenciaService } from '../../../services/incidencia.service';
import { OrdenService } from '../../../services/orden.service';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-incidencia',
  imports: [RouterModule, FormsModule],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css'
})
export class IncidenciaComponent {

  codigo_tipo: string = '';
  observaciones: string = '';
  tipo: string = '';
  datos: any;
  id_orden: any;
  id_administrativo: any;
  operadorId: any;
  ordenPertenece: any;
  usuario: any;

  constructor(

    private incidenciaService: IncidenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private sacarOrden: OrdenService,
    private usuarioService: UsuarioService

  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id_orden = params['id'];
    });
    this.ordenPadre();
  }

  ordenPadre(){

    this.sacarOrden.getSuppliersList().subscribe(resp => {
      this.datos = resp;

      console.log(this.datos);

      this.ordenPertenece = this.datos.find((orden: any) => orden.id == this.id_orden);

      console.log(this.ordenPertenece)

      this.id_administrativo = this.ordenPertenece.id_administrativo;

    });

  }

  crearIncidencia(){


        switch(this.codigo_tipo){

          case '1':

            this.tipo = 'Grua'

            break;

          case '2':

            this.tipo = 'Operador'

            break;

          case '3':

            this.tipo = 'Buque'

            break;

          case '4':

            this.tipo = 'Contenedor'

            break;

        }

        this.usuario = this.usuarioService.getUsuario();

        const incidencia = {

          codigo_tipo: this.codigo_tipo,
          tipo: this.tipo,
          observacion: this.observaciones,
          id_administrativo: this.id_administrativo,
          id_orden: this.id_orden,
          id_operador: this.usuario.id,

        }

        console.log(incidencia);

      if (incidencia) {

        this.incidenciaService.crearIncidencia(incidencia).subscribe({

          next: (response) => {

            console.log('Incidencia creada con exito');

          },
          error: (error) => {

            console.error('No se ha podido crear la incidencia', error)
            console.log('No se ha podido guardar la incidencia: ' , incidencia)

          }

        });
      }
  }

  volverAnterior(): void {

    this.router.navigate(['/operador/ordenes/orden/', this.id_orden]);

  }

}


