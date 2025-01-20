import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from 'express';


@Component({
  selector: 'app-operador',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './operador.component.html',
  styleUrl: './operador.component.css'
})
export class OperadorComponent {

  menuVisible: boolean = false;

  mostrarMenu(): void{

    this.menuVisible = !this.menuVisible;

    if(this.menuVisible){
      let boton = document.getElementById('botonMostrarMenu');
      boton?.setAttribute('hidden', 'true');

    }
  }

}
