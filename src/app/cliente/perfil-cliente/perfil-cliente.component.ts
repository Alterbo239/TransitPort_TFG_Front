import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-cliente',
  imports: [],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.css'
})
export class PerfilClienteComponent {
  nombre: string = '';
  usuario: string = '';
  telefono: string = '';
  email: string = '';

  constructor (
    private user: UsuarioService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    const user = this.user.getUsuario();

    this.nombre = user.name;
    this.usuario = user.usuario;
    this.telefono = user.telefono;
    this.email = user.email;
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
