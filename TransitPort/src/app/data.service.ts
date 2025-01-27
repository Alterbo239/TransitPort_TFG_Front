import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SuppliersService {

    private suppliers : Suppliers[] = [
        { id : 1, name : 'Susana', contactNumber : '22222'},
        { id : 2, name : 'Supplier B', contactNumber : '9856535269'},
        { id : 3, name : 'Supplier C', contactNumber : '9856447856'},
        { id : 4, name : 'Supplier D', contactNumber : '9845687900'}
    ]

    getSuppliersList(): Observable<Suppliers[]> {
        return of(this.suppliers);
    }
}

export interface Suppliers{
    id: number;
    name : string;
    contactNumber : string;
}