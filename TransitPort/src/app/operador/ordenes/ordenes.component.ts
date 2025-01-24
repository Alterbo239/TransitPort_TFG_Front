import { Component } from '@angular/core';
import { TablaOrdenesComponent } from './tabla-ordenes/tabla-ordenes.component';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [TablaOrdenesComponent],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent {

}
