import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../services/orden.service';
import { ActivatedRoute, Router } from '@angular/router';
import { style } from '@angular/animations';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  datos: any;
  ordenId: string = '';
  ordenSeleccionada: any;
  usuario: any;
  usuarioId: any;

  constructor(
    private suppliersService: OrdenService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService
  ) {}

  volver(): void {

    this.router.navigate(['/operador/ordenes']);

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.ordenId = params['id'];
      this.cargarOrden();
    });
  }

  cargarOrden(): void {

    this.usuario = this.userService.getUsuario();

        console.log(this.usuario);

        this.usuarioId = this.usuario.id;

    this.suppliersService.getOrdenes(this.usuarioId).subscribe(resp => {
      this.datos = resp;

      console.log('Entra: ', this.datos)

      this.ordenSeleccionada = this.datos.find((orden: any) => orden.id == this.ordenId);
      let titulo = document.getElementById('titulo_rellenar');
      console.log(this.ordenSeleccionada);

      if (titulo) {
        titulo.innerHTML = 'Orden ' + this.ordenSeleccionada.buque.nombre;
      }

      this.actualizarInformacionDestino();

      this.colorBotones();

      this.configurarBotonesEstado();
    });
  }

  actualizarInformacionDestino() {
    let ubiProcedencia = document.getElementById('ubi-procedencia');
    let zonaProcedencia = document.getElementById('zona-procedencia');
    let ubiDestino = document.getElementById('ubi-destino');
    let zonaDestino = document.getElementById('zona-destino');

    if (ubiProcedencia && zonaProcedencia && ubiDestino && zonaDestino) {
      if (this.ordenSeleccionada.tiene.tipo_destino === 'Buque') {

        ubiProcedencia.textContent = 'Parcela ' + this.ordenSeleccionada.contenedor.parcela;
        zonaProcedencia.textContent = this.ordenSeleccionada.zona.ubicacion;
        ubiDestino.textContent = this.ordenSeleccionada.buque.nombre;
        zonaDestino.textContent = 'Amarre ' + this.ordenSeleccionada.buque.amarre;

      } else if (this.ordenSeleccionada.tiene.tipo_destino === 'Zona') {

        ubiProcedencia.textContent = this.ordenSeleccionada.buque.nombre;
        zonaProcedencia.textContent = 'Amarre ' + this.ordenSeleccionada.buque.amarre;
        ubiDestino.textContent = 'Parcela ' + this.ordenSeleccionada.contenedor.parcela;
        zonaDestino.textContent = this.ordenSeleccionada.zona.ubicacion;

      }
    }
  }

  // Método para configurar los botones de estado
  configurarBotonesEstado() {
    let botonUno = document.getElementById('por-hacer');
    let botonDos = document.getElementById('en-curso')!;
    let botonTres = document.getElementById('finalizada');

    if(botonDos && botonUno){
      botonUno.addEventListener('click', () => {
        botonUno.classList.add('active');
        botonDos.classList.remove('active');
        botonTres?.classList.remove('active');
        this.ordenSeleccionada.estado = 'Por empezar';
        console.log(this.ordenSeleccionada);

        if (this.ordenSeleccionada) {
          this.suppliersService.actualizarEstado(this.ordenSeleccionada).subscribe({
            next: (response) => {
              console.log('Estado actualizado correctamente:', response);

            },
            error: (error) => {
              console.error('Error al actualizar el estado:', error);
            }
          });

        } else {
          console.error('ID de la orden no encontrado.');
        }
      });
    }

    if(botonDos && botonUno){
      botonDos.addEventListener('click', () => {
        botonDos.classList.add('active');
        botonUno.classList.remove('active');
        botonTres?.classList.remove('active');
        this.ordenSeleccionada.estado = 'En curso';
        console.log(this.ordenSeleccionada);

        if (this.ordenSeleccionada) {
          this.suppliersService.actualizarEstado(this.ordenSeleccionada).subscribe({
            next: (response) => {
              console.log('Estado actualizado correctamente:', response);

            },
            error: (error) => {
              console.error('Error al actualizar el estado:', error);
            }
          });

        } else {
          console.error('ID de la orden no encontrado.');
        }
      });
    }

    if(botonTres && botonUno){
      botonTres.addEventListener('click', () => {

        this.mostrarFondo();

        let botonAceptar = document.getElementById('finalizar');
        let botonCancelar = document.getElementById('cancelar');

        if(botonAceptar && botonCancelar){

          botonCancelar.addEventListener('click', () => {

            this.ocultarFondo();

          });

          botonAceptar.addEventListener('click', () => {

            this.ocultarFondo();
            botonTres.classList.add('active');
            botonUno.classList.remove('active');
            botonDos.classList.remove('active');
            this.ordenSeleccionada.estado = 'Completada';

            console.log(this.ordenSeleccionada);

            if (this.ordenSeleccionada) {

              this.suppliersService.actualizarEstado(this.ordenSeleccionada).subscribe({
                next: (response) => {
              console.log('Estado actualizado correctamente:', response);
              this.cambiarSiguiente();

            },
            error: (error) => {
              console.error('Error al actualizar el estado:', error);
            }
          });

        } else {
          console.error('ID de la orden no encontrado.');
        }
        });
        }



      });

    }


  }

  colorBotones():void{

    let botonUno = document.getElementById('por-hacer');
    let botonDos = document.getElementById('en-curso')!;
    let botonTres = document.getElementById('finalizada');

    botonUno?.classList.remove('active');
    botonDos?.classList.remove('active');
    botonTres?.classList.remove('active');

    if(this.ordenSeleccionada.estado === 'Por empezar'){

      botonUno?.classList.add('active');
    }else if(this.ordenSeleccionada.estado === 'En curso'){
      botonDos?.classList.add('active');
    }else {

      botonTres?.classList.add('active');

    }

  }

  cambiarSiguiente():void{

    let ordenActual = this.ordenSeleccionada.id;
    let siguiente = ordenActual + 1;
    this.router.navigate(['/operador/ordenes/orden/', siguiente]);
  }

  volverAnterior(): void {
    let ordenActual = this.ordenSeleccionada.id;

    if(ordenActual > 1){
    let anterior = ordenActual - 1;
    this.router.navigate(['/operador/ordenes/orden/', anterior]);
    }
  }

  crearIncidencia():void{

    this.router.navigate(['/operador/ordenes/incidencia/', this.ordenSeleccionada.id]);

  }

  mostrarFondo():void{

    let fondo = document.getElementById('fondo');
    if(fondo)
    fondo.removeAttribute('hidden');

  }

  ocultarFondo():void{

    let fondo = document.getElementById('fondo');
    if(fondo)
    fondo.setAttribute('hidden', 'true');

  }
}