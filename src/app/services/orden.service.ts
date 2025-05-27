import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Orden } from "../models/orden";
import { Incidencia } from '../models/incidencia';
import { map } from 'rxjs/operators';
import { Orden2 } from '../models/orden2';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  constructor(private http: HttpClient){}

  getOrden(): Observable<any[]> {
    return this.http.get<any[]>('http://54.91.214.74/api/orden');
  }

  getOrdenes(id?: any): Observable<any[]> {

    return this.http.get<any[]>(`http://54.91.214.74/api/operador/ordenes?id_operador=${id}`);

  }

  actualizarOrdenes(orden: Orden2) {
    return this.http.put<Orden2>(`http://54.91.214.74/api/orden/actualizar/${orden.id}`, orden);
  }

  validarGrua(id: any): Observable<boolean> {
    return this.http.get(`http://54.91.214.74/api/grua/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  validarBuque(id: any): Observable<boolean> {
    return this.http.get(`http://54.91.214.74/api/buque/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  validarZona(id: any): Observable<boolean> {
    return this.http.get(`http://54.91.214.74/api/zona/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  validarOperador(id: any): Observable<boolean> {
    return this.http.get(`http://54.91.214.74/api/operador/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  actualizarEstado(orden: Orden): Observable<Orden> {
    return this.http.put<Orden>(`http://54.91.214.74/api/operador/ordenes/orden/${orden.id}`, orden);
  }

  crearIncidencia(incidencia: Incidencia){

    return this.http.post('http://54.91.214.74/api/incidencia', incidencia);

  }

  getIncidencia(): Observable<any[]> {
    return this.http.get<any[]>('http://54.91.214.74/api/incidencia');
  }

  borrarIncidencia(id: string) {
    return this.http.delete(`http://54.91.214.74/api/incidencia/borrar/${id}`);
  }
}
