import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-perfil-ordenador',
  imports: [CommonModule],
  templateUrl: './perfil-ordenador.component.html',
  styleUrl: './perfil-ordenador.component.css'
})
export class PerfilOrdenadorComponent implements OnInit{
  usuario!: Usuario;//le paso los datos de la interfaz Usuario, y con ! le digo que no es nulo

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario(); //recojo los datos del usuario de la api, conectando con el servicio
  }
}
