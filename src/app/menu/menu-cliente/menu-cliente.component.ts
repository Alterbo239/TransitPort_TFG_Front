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

      let ruta = localStorage.getItem("rutaCliente"); //Cogemos la ruta actual.

      // Si la ruta ya existe, la guardamos en la ruta actual, sino (primera vez que entras a la pagina).
      if (ruta) {
        this.currentRoute = ruta;
      } else {
        const initialUrl = this.router.url; // Recogemos la url de la pagina.
        const urlSegments = initialUrl.split('/'); // La guardamos por partes.
        this.currentRoute = urlSegments[urlSegments.length - 1]; // Cogemos la ultima parte (Que coincide con el "id" de las imagenes del menu).

        localStorage.setItem("rutaCliente", this.currentRoute); // Agregamos la variable al almacenamiento local.
      }

      // Mismo caso del "else" pero despues de redirigirnos.
      this.router.events.subscribe(event => {
        if ( event instanceof NavigationEnd ) {
          const urlSegments = event.urlAfterRedirects.split('/');
          this.currentRoute = urlSegments[urlSegments.length - 1];

          localStorage.setItem("rutaCliente", this.currentRoute);
        }
      });
    }

    /**
     * Funcion que compara si la ruta y en enlace se llaman igual, para marcarlo.
     * @param route Nombre de la ruta.
     * @returns Validacion booleana.
     */
    isSelected(route: string): boolean {
      return this.currentRoute === route;
    }
}
