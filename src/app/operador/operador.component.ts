import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-operador',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './operador.component.html',
  styleUrl: './operador.component.css'
})
export class OperadorComponent {

  menuVisible: boolean = false;
  usuarioId:  string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ){

  }

  mostrarMenu(): void{

    this.menuVisible = !this.menuVisible;

    if(this.menuVisible){
      let boton = document.getElementById('botonMostrarMenu');
      boton?.setAttribute('hidden', 'true');

      const usuario = this.usuarioService.getUsuario();

    if(usuario){

    let textoNombre = document.getElementById('nombreUsuario');
    if(textoNombre){

      textoNombre.innerText = usuario.name;

    }

    } else{

      console.log('No hay usuario');

    }

      let enlaceOrdenes = document.getElementById('ordenes');
      let enlaceNotificaciones = document.getElementById('notificaciones');

      switch(this.router.url){

        case '/operador/ordenes':

          enlaceOrdenes?.classList.add('actual');

          enlaceNotificaciones?.classList.remove('actual');

          break;

        case '/operador/notificaciones':

          enlaceNotificaciones?.classList.add('actual');

          enlaceOrdenes?.classList.remove('actual');

          break;

      }

    } else{

      let boton = document.getElementById('botonMostrarMenu');
      boton?.removeAttribute('hidden');

    }


  }

  logout(){

    this.authService.logout()
    this.router.navigate(['/']);

  }

}
