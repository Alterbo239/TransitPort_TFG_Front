import { Component } from '@angular/core';
import { TablaOrdenesComponent } from './tabla-ordenes/tabla-ordenes.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [TablaOrdenesComponent, RouterModule],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent {

}
