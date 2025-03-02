import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruaService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getGruas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gruas`);
  }

  getZonas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/zonas`);
  }

  asignarGrua(id_grua: number, id_zona: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar-grua`, { id_grua, id_zona });
  }

  eliminarGrua(id_grua: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/gruas/${id_grua}`);
  }
}
