import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuClienteComponent } from '../menu/menu-cliente/menu-cliente.component';

@Component({
  selector: 'app-cliente',
  imports: [RouterOutlet, MenuClienteComponent ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

}
