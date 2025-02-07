import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  mostrarContrasenya: boolean = false;
  passwordTipo: string = 'password';
  iconoMostrarContrasenya: string = '/assets/Login/eye.svg';

  //cambiar la visibilidad de la contraseña
  ocultarContrasenya(): void {

    if (this.mostrarContrasenya) {

      this.passwordTipo = 'password';
      this.iconoMostrarContrasenya = '/assets/Login/eye.svg';//Ojo abierto

    } else {

      this.passwordTipo = 'text'; // Si está oculta, la mostramos
      this.iconoMostrarContrasenya = '/assets/Login/eyeClosed.svg';//Ojo cerrado

    }

    this.mostrarContrasenya = !this.mostrarContrasenya;
  }

}
