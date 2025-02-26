
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incidencia } from '../models/incidencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private apiUrl = 'http://localhost/api/incidencia';
  private apiOrden = 'http://localhost/api/orden';

  constructor(

    private http: HttpClient

  ) { }

  crearIncidencia(incidencia: Incidencia){

    return this.http.post(this.apiUrl, incidencia);

  }

  getSuppliersList(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }
}
