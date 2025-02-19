import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Orden } from "../models/orden";

@Injectable({
    providedIn: 'root'
})
export class OrdenesService {

  private apiUrl = 'http://localhost:8000/api/operador/ordenes';

  private urlPut = 'http://localhost:8000/api/operador/ordenes/orden'

    constructor(private http: HttpClient){}

    getSuppliersList(): Observable<any[]> {

      return this.http.get<any[]>(this.apiUrl);

    }
    actualizarEstado(orden: Orden): Observable<Orden> {
      return this.http.put<Orden>(`${this.urlPut}/${orden.id}`, orden);
    }
}
