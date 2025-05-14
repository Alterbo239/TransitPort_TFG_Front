import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/empresas');
  }
  getCiudades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/ciudades');
  }

  actualizarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`http://127.0.0.1:8000/api/empresas/update/${empresa.id}`, empresa);
  }
}
