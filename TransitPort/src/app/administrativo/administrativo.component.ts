import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-administrativo',
  imports: [RouterOutlet, RouterLink, MenuComponent],
  templateUrl: './administrativo.component.html',
  styleUrl: './administrativo.component.css'
})
export class AdministrativoComponent {
  
}
