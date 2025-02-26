import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  private apiUrl = 'http://localhost/api/orden';

  constructor(private http: HttpClient){}

  getSuppliersList(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }
}
