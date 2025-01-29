import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-incidencia',
  imports: [DataTablesModule, RouterModule],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css'
})
export class IncidenciaComponent {

  constructor(private router: Router){}

    volverAtras(): void {

      this.router.navigate(['operador/orden']);

    }

}
