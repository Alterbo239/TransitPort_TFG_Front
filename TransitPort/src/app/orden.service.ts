import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  // private suppliers : Suppliers[] = [
  //         { fecha : new Date(2024, 11, 3) , orden : 'Carga', estado : 'En curso'},
  //         { fecha : new Date(2024, 11, 1) , orden : 'Carga', estado : 'Completada'},
  //         { fecha : new Date(2024, 10, 21) , orden : 'Descarga', estado : 'Por empezar'},
  //     ]

  //     getSuppliersList(): Observable<Suppliers[]> {
  //         return of(this.suppliers);
  //     }

  // private apiUrl= 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  obtenerDatos(){

    return this.http.get("http://localhost/api/gestor");

  }

}


// export interface Suppliers {
//   fecha: Date;
//   orden: string;
//   estado: string;
// }
