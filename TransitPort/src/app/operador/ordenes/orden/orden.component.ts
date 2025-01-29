import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-orden',
  imports: [DataTablesModule, RouterModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export class OrdenComponent {

  constructor(private router: Router){}

    pulsarIncidencia(): void {
      this.router.navigate(['operador/incidencia']);
    }

    volver(): void {

      this.router.navigate(['operador/ordenes']);

    }

}
