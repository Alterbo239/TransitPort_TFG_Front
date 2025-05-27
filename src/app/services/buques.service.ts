import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Buque } from '../models/buque';

@Injectable({
  providedIn: 'root'
})
export class BuquesService {
  private apiUrl = 'http://127.0.0.1:8000:8000/api/buques'; //Url base para el resto de peticiones.

  constructor(private http: HttpClient){}

  /**
   * Funcion que recoge los transportes de la BD.
   * @returns Lista de transportes.
   */
  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  /**
   * Misma funcion pero filtrando por cliente que entra.
   * @param id Id del cliente.
   * @returns Lista transportes filtrada.
   */
  getBuquesFiltrados(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  /**
   * Funcion para actualziar un transporte.
   * @param buque Transporte a actualziar.
   * @returns Transporte actualizado.
   */
  actualizarBuque(buque: Buque): Observable<Buque> {
    return this.http.put<Buque>(`${this.apiUrl}/update/${buque.id}`, buque);
  }

  /**
   * Funcion que busca la empresa para validar que se encuentra en la BD.
   * @param id Id de la empresa.
   * @returns Booleano de validacion.
   */
  validarEmpresa(id: any): Observable<boolean> {
    return this.http.get(`http://127.0.0.1:8000:8000/api/empresas/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
