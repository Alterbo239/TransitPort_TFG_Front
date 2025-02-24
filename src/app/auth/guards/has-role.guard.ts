import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, GuardResult, MaybeAsync } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class hasRole implements CanActivate {

  constructor(

    private authService: AuthService,
    private userService: UsuarioService,
    private router: Router

  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    const allowedRoles = route.data?.['allowedRoles'];

    let user = this.userService.getUsuario();

    if(user && allowedRoles.includes(user.cargo)){

      return true;

    }

    alert('Acceso denegado');
    return this.router.createUrlTree(['/'])

  }

}
