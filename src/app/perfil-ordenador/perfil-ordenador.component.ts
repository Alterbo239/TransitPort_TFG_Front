import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-perfil-ordenador',
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './perfil-ordenador.component.html',
  styleUrl: './perfil-ordenador.component.css'
})
export class PerfilOrdenadorComponent implements OnInit{
  usuario!: Usuario;//le paso los datos de la interfaz Usuario, y con ! le digo que no es nulo
  rol: string | null = '';

  constructor (
    private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router
      ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol(); //Por ultimo recogemos el rol del usuario.
    this.usuario = this.usuarioService.getUsuario(); //recojo los datos del usuario de la api, conectando con el servicio
  }
}
