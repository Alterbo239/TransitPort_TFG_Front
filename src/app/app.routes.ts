import { Routes } from '@angular/router';
import { CrearOrdenComponent } from './administrativo/crear-orden/crear-orden.component';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { CrearTurnoComponent } from './administrativo/crear-turno/crear-turno.component';
import { MonitorizarOrdenComponent } from './administrativo/monitorizar-orden/monitorizar-orden.component';
import { BuscarContenedorComponent } from './administrativo/buscar-contenedor/buscar-contenedor.component';
import { RealizarAuditoriaComponent } from './administrativo/auditorias/realizar-auditoria/realizar-auditoria.component';
import { IncidenciasComponent } from './administrativo/incidencias/incidencias.component';
import { GestorComponent } from './gestor/gestor.component';
import { PerfilOrdenadorComponent } from './perfil-ordenador/perfil-ordenador.component';
import { CrearGruasComponent } from './gestor/crear-gruas/crear-gruas.component';
import { CrearPatioComponent } from './gestor/crear-patio/crear-patio.component';
import { GestionarGruasComponent } from './gestor/gestionar-gruas/gestionar-gruas.component';
import { UsuariosComponent } from './gestor/usuarios/usuarios.component';
import { LogInComponent } from './log-in/log-in.component';
import { OperadorComponent } from './operador/operador.component';
import { OrdenesComponent } from './operador/ordenes/ordenes.component';
import { NotificacionesComponent } from './operador/notificaciones/notificaciones.component';
import { PerfilComponent } from './operador/perfil/perfil.component';
import { CrearUsuarioComponent} from './gestor/crear-usuario/crear-usuario.component';
import { OrdenComponent } from './operador/ordenes/orden/orden.component';
import { IncidenciaComponent } from './operador/ordenes/incidencia/incidencia.component';
import { isLoggedIn } from './auth/guards/is-logged-in.guard';
import { hasRole } from './auth/guards/has-role.guard'
import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';
import { VehiculosComponent } from './administrativo/vehiculos/vehiculos.component';
import { CitasComponent } from './administrativo/citas/citas.component';
import { EmpresasComponent } from './gestor/empresas/empresas.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CitasClienteComponent } from './cliente/citas-cliente/citas-cliente.component';
import { PerfilClienteComponent } from './cliente/perfil-cliente/perfil-cliente.component';
import { TransportesClienteComponent } from './cliente/transportes-cliente/transportes-cliente.component';
import { PedirCitaComponent } from './cliente/pedir-cita/pedir-cita.component';


export const routes: Routes = [
    {
        path: 'perfil-ordenador',
        component: PerfilOrdenadorComponent
    },
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
            {
                path: 'citas',
                component: CitasComponent
            },
            {
                path: 'vehiculos',
                component: VehiculosComponent
            },
        ]
    },

    {
      path: 'cliente',
      canActivate:[hasRole],
      data: {

        allowedRoles: ['cliente']

      },
      component: ClienteComponent,
      children: [
          {
              path: 'ver-citas',
              component: CitasClienteComponent
          },
          {
              path: 'pedir-citas',
              component: PedirCitaComponent
          },
          {
              path: 'ver-transportes',
              component: TransportesClienteComponent
          },
          {
              path: 'perfil-cliente',
              component: PerfilClienteComponent
          },
      ]
    },

    {
        path: 'gestor',
        canActivate:[hasRole],
        data: {

          allowedRoles: ['gestor', 'cliente']

        },
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
            {
              path: 'crear-usuario',
              component: CrearUsuarioComponent
            },
            {
                path: 'empresas',
                component: EmpresasComponent
            },
        ]
    },

    {
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
            pathMatch: 'full',
          },
          {
              path: 'ordenes',
              component: OrdenesComponent
          },
          {
              path: 'ordenes/orden/:id',
              component: OrdenComponent,
              data: { skipPrerender: true },

          },
          {
            path: 'ordenes/incidencia/:id',
            component: IncidenciaComponent,
            data: { skipPrerender: true },

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
  },

];
