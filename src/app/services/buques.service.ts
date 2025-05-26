import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Buque } from '../models/buque';

@Injectable({
  providedIn: 'root'
})
export class BuquesService {
  private apiUrl = 'https://34.227.117.124/api/buques';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getBuquesFiltrados(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  actualizarBuque(buque: Buque): Observable<Buque> {
    return this.http.put<Buque>(`${this.apiUrl}/update/${buque.id}`, buque);
  }
  validarEmpresa(id: any): Observable<boolean> {
    return this.http.get(`https://34.227.117.124/api/empresas/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
