import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { Router, RouterModule} from '@angular/router';


@Component({
  selector: 'app-tabla-ordenes',
  standalone: true,
  imports: [DataTablesModule, RouterModule],
  templateUrl: './tabla-ordenes.component.html',
  styleUrls: ['./tabla-ordenes.component.css']
})
export class TablaOrdenesComponent {

  constructor(private router: Router){}

    pulsarOrden(): void {
      this.router.navigate(['operador/orden']);
    }

  }
