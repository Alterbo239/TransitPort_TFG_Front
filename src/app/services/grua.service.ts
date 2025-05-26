import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruaService {
  private apiUrl = 'https://34.227.117.124/api';

  constructor(private http: HttpClient) {}

  //con any, podemos devolver cuqluier tipo de dato
  getGruas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/grua`);
  }

  getZonas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/zona`);
  }

  asignarGruas(payload: { id_zona: number; id_grua: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar-grua`, payload);
  }
}
