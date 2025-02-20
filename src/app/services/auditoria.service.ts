import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  constructor(private http: HttpClient){}

  getSuppliersUp(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost/api/auditoriaArriba");
  }
  getSuppliersDown(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost/api/auditoriaAbajo");
  }
}
