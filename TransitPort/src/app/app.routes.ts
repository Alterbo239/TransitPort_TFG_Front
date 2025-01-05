import { Routes } from '@angular/router';
import { CrearOrdenComponent } from './administrativo/crear-orden/crear-orden.component';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { CrearTurnoComponent } from './administrativo/crear-turno/crear-turno.component';
import { MonitorizarOrdenComponent } from './administrativo/monitorizar-orden/monitorizar-orden.component';
import { BuscarContenedorComponent } from './administrativo/buscar-contenedor/buscar-contenedor.component';
import { RealizarAuditoriaComponent } from './administrativo/realizar-auditoria/realizar-auditoria.component';
import { IncidenciasComponent } from './administrativo/incidencias/incidencias.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
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
    }
];
