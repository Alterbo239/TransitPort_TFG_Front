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
      switch(this.router.url){

        case '/operador/ordenes':

        alert('operador')

        let enlace = document.getElementById('ordenes');

        // enlace?.classList.add('actual');

        break;

      }
      console.log('Current URL:', this.router.url);

    } else{

      let boton = document.getElementById('botonMostrarMenu');
      boton?.removeAttribute('hidden');

    }


  }

}
