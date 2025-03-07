
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
    'index.csr.html': {size: 5793, hash: '22c87778b313f6c116651151af78a305056aecdb6831d0b8ec8d4bf012fece20', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1510, hash: 'b13224ea52db3842af0767530824c1d1b5584005e8d14f6739e5e8ec3dbc7d4a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-77DJB6DN.css': {size: 258824, hash: 'mwCkpARzoCU', text: () => import('./assets-chunks/styles-77DJB6DN_css.mjs').then(m => m.default)}
  },
};
