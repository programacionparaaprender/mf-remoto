const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-remoto',

  exposes: {
    './RemotoComponent': './src/app/views/remoto/remoto.component.ts',
    './ServicioPrueba': './src/app/shared/services/servicio-prueba.ts',
    './Component': './src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
