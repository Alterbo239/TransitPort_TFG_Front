import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://127.0.0.1:8000/api/citas';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getCitasCliente(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  actualizarCita(cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`http://127.0.0.1:8000/api/citas/update/${cita.id}`, cita);
  }
  validarZona(id: any): Observable<boolean> {
    return this.http.get(`http://127.0.0.1:8000/api/zona/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
