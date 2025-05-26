import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private apiUrl = 'http://34.227.117.124/api/zona';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
