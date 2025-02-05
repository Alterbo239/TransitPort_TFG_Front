import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-operador',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './operador.component.html',
  styleUrl: './operador.component.css'
})
export class OperadorComponent {

  menuVisible: boolean = false;

  constructor(private router: Router){

  }

  mostrarMenu(): void{

    this.menuVisible = !this.menuVisible;

    if(this.menuVisible){
      let boton = document.getElementById('botonMostrarMenu');
      boton?.setAttribute('hidden', 'true');

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

}
