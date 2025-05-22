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
      this.rol = this.authService.getRol();

      let ruta = localStorage.getItem("rutaCliente");

      if (ruta) {
        this.currentRoute = ruta;
      }

      this.router.events.subscribe(event => {
        if ( event instanceof NavigationEnd ) {
          const urlSegments = event.urlAfterRedirects.split('/'); // Recogemos la url de la pagina y la guardamos por partes.
          this.currentRoute = urlSegments[urlSegments.length - 1]; // Cogemos la ultima parte (Que coincide con el "id" de las imagenes del menu).

          localStorage.setItem("rutaCliente", this.currentRoute);
        }
      });
    }

    isSelected(route: string): boolean {
      return this.currentRoute === route;
    }
}
