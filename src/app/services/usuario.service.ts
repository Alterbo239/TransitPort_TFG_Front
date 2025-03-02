import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private usuario: any = null;

  setUsuario(usuario: any): void{
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): any{
    if (!this.usuario) {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.usuario = JSON.parse(usuarioGuardado);
      }
    }
    return this.usuario;
  }

  getUsuarioPerfil():Observable<any>{
    
    return this.http.get<any>(`${this.apiUrl}/user`);

  }

  getPersonal(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/gestor`);

  }

}