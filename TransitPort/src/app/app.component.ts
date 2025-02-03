import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { OrdenService } from './orden.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DataTablesModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TransitPort';

}
