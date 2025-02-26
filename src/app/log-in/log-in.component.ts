import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router) {}

  usuarioId: string = '';
  email: string = '';
  password: string = '';
  mostrarContrasenya: boolean = false;
  passwordTipo: string = 'password';
  iconoMostrarContrasenya: string = '/assets/Login/eye.svg';

  //cambiar la visibilidad de la contraseña
  ocultarContrasenya(): void {

    if (this.mostrarContrasenya) {

      this.passwordTipo = 'password';
      this.iconoMostrarContrasenya = '/assets/Login/eyeClosed.svg'; //Ojo abierto

    } else {

      this.passwordTipo = 'text'; // Si está oculta, la mostramos
      this.iconoMostrarContrasenya = '/assets/Login/eye.svg'; //Ojo cerrado

    }

    this.mostrarContrasenya = !this.mostrarContrasenya;
  }

  onLogin() {

  const credentials = {

    email: this.email,
    password: this.password

  }
  console.log('Intentando iniciar sesión con:', this.email, this.password);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        this.usuarioService.setUsuario(response.user);
        console.log('Usuario recibido en login:', response.user);

        //Guardamos el rol del usuario en AuthService.
        const rol = response.cargo;
        this.authService.setRol(rol);
        this.authService.logIn.next(true); //Actualizamos el "logIn".

        if(response.user.cargo == "operador"){
          this.router.navigate(['/operador/ordenes']);
        } else if(response.user.cargo == "administrativo"){
          this.router.navigate(['/administrativo']);
        } else {
          this.router.navigate(['/gestor']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      }
    });
  }


}