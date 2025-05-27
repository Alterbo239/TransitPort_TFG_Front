import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Url base.

  constructor(private http: HttpClient){}

  /**
   * Funcion para recoger los datos de las empresas de la BD.
   * @returns Lista de empresas.
   */
  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/empresas');
  }
  /**
   * Funcion que recoge las ciudades de la BD. (Distinct, osea filtrando para mostrar solo 1 ciudad).
   * @returns Lista de ciudades.
   */
  getCiudades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/ciudades');
  }

  /**
   * Funcion para actualizar la empresa.
   * @param empresa Empresa a actualizar.
   * @returns Empresa actualizada.
   */
  actualizarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`http://127.0.0.1:8000/api/empresas/update/${empresa.id}`, empresa);
  }
}
