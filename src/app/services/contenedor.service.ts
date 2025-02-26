import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenedorService {
  private apiUrl = 'http://127.0.0.1:8000/api/tiene';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }
}
