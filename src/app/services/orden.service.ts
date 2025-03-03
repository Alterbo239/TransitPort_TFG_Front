import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Orden } from "../models/orden";
import { Incidencia } from '../models/incidencia';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  private urlOrden = 'http://localhost:8000/api/orden';

  constructor(private http: HttpClient){}

  getOrden(): Observable<any[]> {
    return this.http.get<any[]>(this.urlOrden);
  }
  
  getOrdenes(id?: any): Observable<any[]> {

    return this.http.get<any[]>(`http://localhost:8000/api/operador/ordenes?id_operador=${id}`)

  }
  actualizarEstado(orden: Orden): Observable<Orden> {
    return this.http.put<Orden>(`http://localhost:8000/api/operador/ordenes/orden/${orden.id}`, orden);
  }
  
  crearIncidencia(incidencia: Incidencia){

    return this.http.post('http://localhost:8000/api/incidencia', incidencia);

  }
}