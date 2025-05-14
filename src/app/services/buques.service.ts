import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Buque } from '../models/buque';

@Injectable({
  providedIn: 'root'
})
export class BuquesService {
  private apiUrl = 'http://127.0.0.1:8000/api/buques';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  actualizarBuque(buque: Buque): Observable<Buque> {
    return this.http.put<Buque>(`http://127.0.0.1:8000/api/buques/update/${buque.id}`, buque);
  }
  validarEmpresa(id: any): Observable<boolean> {
    return this.http.get(`http://127.0.0.1:8000/api/empresas/show/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
