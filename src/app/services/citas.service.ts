import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://127.0.0.1:8000/api/citas'; // Url base.

  constructor(private http: HttpClient){}

  /**
   * Metodo para buscar las citas de la BD.
   * @returns Lista de citas.
   */
  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  /**
   * Mismo metodo pero filtrando por cliente.
   * @param id Id del cliente.
   * @returns Lista de citas filtradas.
   */
  getCitasCliente(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  /**
   * Metodo para actualizar las citas en la BD.
   * @param cita Cita a actualziar.
   * @returns Cita actualziada.
   */
  actualizarCita(cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`http://127.0.0.1:8000/api/citas/update/${cita.id}`, cita);
  }
  /**
   * Metodo para validar si la zona seleccionada existe en la BD.
   * @param id Id de la zona.
   * @returns Booleano de confirmacion.
   */
  validarZona(id: any): Observable<boolean> {
    return this.http.get(`http://127.0.0.1:8000/api/zona/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
