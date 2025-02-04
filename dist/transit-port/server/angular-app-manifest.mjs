
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/administrativo"
  },
  {
    "renderMode": 2,
    "route": "/administrativo/crear-orden"
  },
  {
    "renderMode": 2,
    "route": "/administrativo/crear-turno"
  },
  {
    "renderMode": 2,
    "route": "/administrativo/monitorizar-orden"
  },
  {
    "renderMode": 2,
    "route": "/administrativo/buscar-contenedor"
  },
  {
    "renderMode": 2,
    "route": "/administrativo/realizar-auditoria"
  },
  {
    "renderMode": 2,
    "route": "/administrativo/incidencias"
  },
  {
    "renderMode": 2,
    "route": "/gestor"
  },
  {
    "renderMode": 2,
    "route": "/gestor/crear-gruas"
  },
  {
    "renderMode": 2,
    "route": "/gestor/crear-patio"
  },
  {
    "renderMode": 2,
    "route": "/gestor/gestionar-gruas"
  },
  {
    "renderMode": 2,
    "route": "/gestor/usuarios"
  },
  {
    "renderMode": 2,
    "route": "/gestor/crear-usuario"
  },
  {
    "renderMode": 2,
    "redirectTo": "/operador/ordenes",
    "route": "/operador"
  },
  {
    "renderMode": 2,
    "route": "/operador/ordenes"
  },
  {
    "renderMode": 2,
    "route": "/operador/notificaciones"
  },
  {
    "renderMode": 2,
    "route": "/operador/perfil"
  }
],
  assets: {
    'index.csr.html': {size: 5806, hash: 'a952c4a89ea99faee2b21fc40ea91a156693660ce98624f9f7349a7bc2e1dde9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1523, hash: 'c1066cdc7907f7ec67241e3a0d698f20ddd94279c9ccd9a0028254a66b09bba4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'administrativo/index.html': {size: 11509, hash: 'c153686ce6abe9c8f0396d1cc68a5bcaf929b4968b0cf000e76a47cfe445df3a', text: () => import('./assets-chunks/administrativo_index_html.mjs').then(m => m.default)},
    'index.html': {size: 13871, hash: '0234dbdd50d4d905e717843d0bdb1025966600d0a569f9a65117890529051860', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'administrativo/buscar-contenedor/index.html': {size: 12540, hash: '5947476ecf54367442dc5e65c17f10e745ee622135f1056ca2637b69c189b93f', text: () => import('./assets-chunks/administrativo_buscar-contenedor_index_html.mjs').then(m => m.default)},
    'administrativo/monitorizar-orden/index.html': {size: 13728, hash: '9282c71595d196ffeeabb2f635e667296db82152a9766e2b44259b38c0b1c40c', text: () => import('./assets-chunks/administrativo_monitorizar-orden_index_html.mjs').then(m => m.default)},
    'administrativo/crear-turno/index.html': {size: 11603, hash: '4e7ebc60f4acd1b9aa39b95d6341a2a6d38fc83a2f105c270f720797a84ef359', text: () => import('./assets-chunks/administrativo_crear-turno_index_html.mjs').then(m => m.default)},
    'administrativo/crear-orden/index.html': {size: 14333, hash: 'f99bd5b8f201af450f2ae9fe8df89253d9f5c1b13ccdc88506dcf80a7146b200', text: () => import('./assets-chunks/administrativo_crear-orden_index_html.mjs').then(m => m.default)},
    'administrativo/realizar-auditoria/index.html': {size: 11624, hash: '986b3b8726bd151ebd652a4d5e8d65225774dd3b503d5544e4075f3314c596d4', text: () => import('./assets-chunks/administrativo_realizar-auditoria_index_html.mjs').then(m => m.default)},
    'gestor/index.html': {size: 10984, hash: '7c318cea9a5715a3cc4cba3b37bc4ee2ef417327bb1a7f275b6dd6312542e7cd', text: () => import('./assets-chunks/gestor_index_html.mjs').then(m => m.default)},
    'gestor/crear-gruas/index.html': {size: 11078, hash: '9907c69a3d8baf15e6a1270f7794c5b7030992a87e03c301b9edf3b29901492f', text: () => import('./assets-chunks/gestor_crear-gruas_index_html.mjs').then(m => m.default)},
    'administrativo/incidencias/index.html': {size: 11603, hash: 'd39a818a7e05566c7d75daa0a0ed1846e33d4d88b8a17e685d64994f72f9b5fd', text: () => import('./assets-chunks/administrativo_incidencias_index_html.mjs').then(m => m.default)},
    'gestor/crear-usuario/index.html': {size: 11084, hash: '6bd66e5b79da6a58a148a0dac5b18763d3f92da8155f2c31b45ec2fefe27f224', text: () => import('./assets-chunks/gestor_crear-usuario_index_html.mjs').then(m => m.default)},
    'gestor/gestionar-gruas/index.html': {size: 11090, hash: '7e01ac5d8882031368949b3dd8d1cbf9d12be8fd95a7a75a9f789cc0feecfc8f', text: () => import('./assets-chunks/gestor_gestionar-gruas_index_html.mjs').then(m => m.default)},
    'gestor/usuarios/index.html': {size: 14777, hash: '49bc07be77655fa8762c30c61ace202effae87b5e6af11a25a6829fbe3da28e1', text: () => import('./assets-chunks/gestor_usuarios_index_html.mjs').then(m => m.default)},
    'gestor/crear-patio/index.html': {size: 11078, hash: '2c95848b309352002e8d6633cba2eb443d288f5064a466cd6489feebe9d1f573', text: () => import('./assets-chunks/gestor_crear-patio_index_html.mjs').then(m => m.default)},
    'operador/notificaciones/index.html': {size: 15798, hash: '4eb6c3beceb5290b74074084895d3a6d8d2b9d8956f9cb8f7bacf292695f4090', text: () => import('./assets-chunks/operador_notificaciones_index_html.mjs').then(m => m.default)},
    'operador/perfil/index.html': {size: 13846, hash: '3c8d9f59b5da02355b6796a33121cfe0236b8c19ed0c2d633a396bbbe7c07cfa', text: () => import('./assets-chunks/operador_perfil_index_html.mjs').then(m => m.default)},
    'operador/ordenes/index.html': {size: 16019, hash: 'b0280dd7d684ac9ada37563774c82fd183779c8cb2c306575bec453d365958ad', text: () => import('./assets-chunks/operador_ordenes_index_html.mjs').then(m => m.default)},
    'styles-GF34Q277.css': {size: 258853, hash: 'mEsGXHk8AME', text: () => import('./assets-chunks/styles-GF34Q277_css.mjs').then(m => m.default)}
  },
};
