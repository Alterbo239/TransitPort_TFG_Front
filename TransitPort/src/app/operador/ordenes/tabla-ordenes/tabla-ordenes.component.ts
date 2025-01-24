import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-tabla-ordenes',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './tabla-ordenes.component.html',
  styleUrls: ['./tabla-ordenes.component.css']
})
export class TablaOrdenesComponent {

}
