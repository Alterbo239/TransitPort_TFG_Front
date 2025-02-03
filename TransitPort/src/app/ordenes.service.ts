import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrdenesService{

  private apiUrl = "http://localhost/api/ordenes";

  constructor(private http: HttpClient) {}

  getOrdenes():Observable<any[]>{

    return this.http.get<any[]>(this.apiUrl);

  }

}

