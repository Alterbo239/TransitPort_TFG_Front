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

  //recoge los datos del usuario
  getUsuarioPerfil():Observable<any>{
    
    return this.http.get<any>(`${this.apiUrl}/gestor/buscar/{id}`);

  }

  //recoge los datos de los usuarios en la base de datos
  getPersonal(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/gestor`);

  }

  modificarEstadoUsuario(id: number, estado: string): Observable<any> {
    const body = {
        estado: estado // Enviar solo el estado en el cuerpo
    };

    return this.http.put<any>(`${this.apiUrl}/modificar-estado/${id}`, body);
}
  
    

}