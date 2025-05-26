import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrl = 'https://34.227.117.124/api';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/empresas');
  }
  getCiudades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/ciudades');
  }

  actualizarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`https://34.227.117.124/api/empresas/update/${empresa.id}`, empresa);
  }
}
