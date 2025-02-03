import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SuppliersService {

    private suppliers : Suppliers[] = [
        { cargo : 'Operador/a', name : 'Juan Sánchez', estado : 'Activo/a'},
        { cargo : 'Administrador/a', name : 'María Fuster', estado : 'Inactivo/a'},
        { cargo : 'Operador/a', name : 'Jordi Martínez', estado : 'Activo/a'},
        { cargo : 'Operador/a', name : 'Ramón Cajal', estado : 'Inactivo/a'},
        { cargo : 'Operador/a', name : 'Alberto Navarro', estado : 'Inactivo/a'},
        { cargo : 'Administrativo/a', name : 'Lucas Potter', estado : 'Activo/a'},
        { cargo : 'Operador/a', name : 'Eva María', estado : 'Activo/a'},
        { cargo : 'Administrativo/a', name : 'Marina Dor', estado : 'Activo/a'},
    ]

    getSuppliersList(): Observable<Suppliers[]> {
        return of(this.suppliers);
    }
}

export interface Suppliers{
    cargo: string;
    name : string;
    estado : string;
}
