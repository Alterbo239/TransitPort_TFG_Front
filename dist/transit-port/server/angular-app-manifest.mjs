
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/perfil-ordenador"
  },
  {
    "renderMode": 0,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/administrativo"
  },
  {
    "renderMode": 0,
    "route": "/administrativo/crear-orden"
  },
  {
    "renderMode": 0,
    "route": "/administrativo/crear-turno"
  },
  {
    "renderMode": 0,
    "route": "/administrativo/monitorizar-orden"
  },
  {
    "renderMode": 0,
    "route": "/administrativo/buscar-contenedor"
  },
  {
    "renderMode": 0,
    "route": "/administrativo/incidencias"
  },
  {
    "renderMode": 0,
    "route": "/gestor"
  },
  {
    "renderMode": 0,
    "route": "/gestor/crear-gruas"
  },
  {
    "renderMode": 0,
    "route": "/gestor/crear-patio"
  },
  {
    "renderMode": 0,
    "route": "/gestor/gestionar-gruas"
  },
  {
    "renderMode": 0,
    "route": "/gestor/usuarios"
  },
  {
    "renderMode": 0,
    "route": "/gestor/crear-usuario"
  },
  {
    "renderMode": 0,
    "redirectTo": "/operador/ordenes",
    "route": "/operador"
  },
  {
    "renderMode": 0,
    "route": "/operador/ordenes"
  },
  {
    "renderMode": 0,
    "route": "/operador/ordenes/orden/*"
  },
  {
    "renderMode": 0,
    "route": "/operador/ordenes/incidencia/*"
  },
  {
    "renderMode": 0,
    "route": "/operador/notificaciones"
  },
  {
    "renderMode": 0,
    "route": "/operador/perfil"
  }
],
  assets: {
    'index.csr.html': {size: 5808, hash: '4b9ff0756fea1e446a4b7d606862894f7bd9aed68eb9082ea47cc9da46f38590', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1525, hash: 'a2dde012d5d8d9fd5d0d2c5626687c3483f9060aa0deb9b972e3386fd5db78ed', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-77DJB6DN.css': {size: 258824, hash: 'mwCkpARzoCU', text: () => import('./assets-chunks/styles-77DJB6DN_css.mjs').then(m => m.default)}
  },
};
