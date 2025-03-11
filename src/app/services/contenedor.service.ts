import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenedorService {
  private apiUrl = 'http://localhost/api/tiene';
  private apiUrlContenedor = 'http://localhost/api/contenedor';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  getContenedores(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrlContenedor);

  }
}
