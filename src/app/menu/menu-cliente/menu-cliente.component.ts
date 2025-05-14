import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-cliente',
  imports: [ RouterLink ],
  templateUrl: './menu-cliente.component.html',
  styleUrl: './menu-cliente.component.css'
})
export class MenuClienteComponent  implements OnInit {
    rol: string | null = '';
    currentRoute: string = '';

    constructor (
      private authService: AuthService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.rol = this.authService.getRol(); //Por ultimo recogemos el rol del usuario.

      this.router.events.subscribe(event => {
        if ( event instanceof NavigationEnd ) {
          const urlSegments = event.urlAfterRedirects.split('/');
          this.currentRoute = urlSegments[urlSegments.length - 1];
        }
      });
    }

    isSelected(route: string): boolean {
      return this.currentRoute === route;
    }

    logout(){

      this.authService.logout()
      this.router.navigate(['/']);

    }
}
