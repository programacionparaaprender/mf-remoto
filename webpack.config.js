const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-remoto',

  exposes: {
    './RemotoComponent': './src/app/views/remoto/remoto.component.ts',
    './ViejaComponent': './src/app/views/vieja/vieja.component.ts',
    './ServicioPrueba': './src/app/shared/services/servicio-prueba.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
