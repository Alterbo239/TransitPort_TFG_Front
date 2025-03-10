import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
    rol: string = '';

    constructor (
      private authService: AuthService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.rol = this.authService.getRol(); //Por ultimo recogemos el rol del usuario.
    }

    logout(){

      this.authService.logout()
      this.router.navigate(['/']);
  
    }
}