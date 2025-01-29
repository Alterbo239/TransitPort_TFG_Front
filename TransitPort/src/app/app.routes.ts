import { Routes } from '@angular/router';
import { CrearOrdenComponent } from './administrativo/crear-orden/crear-orden.component';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { CrearTurnoComponent } from './administrativo/crear-turno/crear-turno.component';
import { MonitorizarOrdenComponent } from './administrativo/monitorizar-orden/monitorizar-orden.component';
import { BuscarContenedorComponent } from './administrativo/buscar-contenedor/buscar-contenedor.component';
import { RealizarAuditoriaComponent } from './administrativo/realizar-auditoria/realizar-auditoria.component';
import { IncidenciasComponent } from './administrativo/incidencias/incidencias.component';
import { GestorComponent } from './gestor/gestor.component';
import { CrearGruasComponent } from './gestor/crear-gruas/crear-gruas.component';
import { CrearPatioComponent } from './gestor/crear-patio/crear-patio.component';
import { GestionarGruasComponent } from './gestor/gestionar-gruas/gestionar-gruas.component';
import { UsuariosComponent } from './gestor/usuarios/usuarios.component';
import { LogInComponent } from './log-in/log-in.component';
import { OperadorComponent } from './operador/operador.component';
import { OrdenesComponent } from './operador/ordenes/ordenes.component';
import { NotificacionesComponent } from './operador/notificaciones/notificaciones.component';
import { PerfilComponent } from './operador/perfil/perfil.component';
import { OrdenComponent } from './operador/ordenes/orden/orden.component';
import { IncidenciaComponent } from './operador/ordenes/incidencia/incidencia.component';

export const routes: Routes = [
    {
        path: '',
        component: LogInComponent
    },
    {
        path: 'administrativo',
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
                path: 'realizar-auditoria',
                component: RealizarAuditoriaComponent
            },
            {
                path: 'incidencias',
                component: IncidenciasComponent
            },
        ]
    },{
        path: 'gestor',
        component: GestorComponent,
        children: [
            {
                path: 'crear-gruas',
                component: CrearGruasComponent
            },
            {
                path: 'crear-patio',
                component: CrearPatioComponent
            },
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
              path: 'orden',
              component: OrdenComponent
          },
          {
              path: 'incidencia',
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
