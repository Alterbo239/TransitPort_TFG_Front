import { Routes } from '@angular/router';
import { CrearOrdenComponent } from './administrativo/crear-orden/crear-orden.component';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { CrearTurnoComponent } from './administrativo/crear-turno/crear-turno.component';
import { MonitorizarOrdenComponent } from './administrativo/monitorizar-orden/monitorizar-orden.component';
import { BuscarContenedorComponent } from './administrativo/buscar-contenedor/buscar-contenedor.component';
import { RealizarAuditoriaComponent } from './administrativo/auditorias/realizar-auditoria/realizar-auditoria.component';
import { IncidenciasComponent } from './administrativo/incidencias/incidencias.component';
import { GestorComponent } from './gestor/gestor.component';
import { GestionarGruasComponent } from './gestor/gestionar-gruas/gestionar-gruas.component';
import { UsuariosComponent } from './gestor/usuarios/usuarios.component';
import { LogInComponent } from './log-in/log-in.component';
import { OperadorComponent } from './operador/operador.component';
import { OrdenesComponent } from './operador/ordenes/ordenes.component';
import { NotificacionesComponent } from './operador/notificaciones/notificaciones.component';
import { PerfilComponent } from './operador/perfil/perfil.component';
import { OrdenComponent } from './operador/ordenes/orden/orden.component';
import { IncidenciaComponent } from './operador/ordenes/incidencia/incidencia.component';
import { isLoggedIn } from './auth/guards/is-logged-in.guard';
import { hasRole } from './auth/guards/has-role.guard'

export const routes: Routes = [
    {
        path: '',
        component: LogInComponent
    },
    {
        path: 'administrativo',
        canActivate:[hasRole],
        data: {

          allowedRoles: ['administrativo']

        },
        component: AdministrativoComponent,
        children: [
            {
                path: 'crear-orden',
                component: CrearOrdenComponent
            },
            {
                path: 'crear-turno',
                component: CrearTurnoComponent
            },
            {
                path: 'monitorizar-orden',
                component: MonitorizarOrdenComponent
            },
            {
                path: 'buscar-contenedor',
                component: BuscarContenedorComponent
            },
            {
                path: 'incidencias',
                component: IncidenciasComponent
            },
        ]
    },{
        path: 'gestor',
        canActivate:[hasRole],
        data: {

          allowedRoles: ['gestor']

        },
        component: GestorComponent,
        children: [
            
            
            {
                path: 'gestionar-gruas',
                component: GestionarGruasComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            },
            
        ]
    },{
      path: 'operador',
      canActivate:[hasRole],
      data: {

        allowedRoles: ['Operador', 'operador']

      },
      component: OperadorComponent,
      children: [

          {
            path: '',
            redirectTo: 'ordenes',
            pathMatch: 'full' },
          {
              path: 'ordenes',
              component: OrdenesComponent
          },
          {
              path: 'ordenes/orden/:id',
              component: OrdenComponent
          },
          {
            path: 'ordenes/incidencia/:id',
            component: IncidenciaComponent
          },
          {
              path: 'notificaciones',
              component: NotificacionesComponent
          },
          {
              path: 'perfil',
              component: PerfilComponent
          },
      ]
  }
];
