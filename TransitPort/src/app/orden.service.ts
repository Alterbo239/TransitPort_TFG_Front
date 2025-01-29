import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  private suppliers : Suppliers[] = [
          { fecha : new Date(2024, 11, 3) , orden : 'Carga', estado : 'En curso'},
          { fecha : new Date(2024, 11, 1) , orden : 'Carga', estado : 'Completada'},
          { fecha : new Date(2024, 10, 21) , orden : 'Descarga', estado : 'Por empezar'},
      ]
  
      getSuppliersList(): Observable<Suppliers[]> {
          return of(this.suppliers);
      } 
}

export interface Suppliers {
  fecha: Date;
  orden: string;
  estado: string;
}