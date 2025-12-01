const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-remoto',

  exposes: {
    './RemotoComponent': './src/app/views/remoto/remoto.component.ts',
    './ViejaComponent': './src/app/views/vieja/vieja.component.ts',
    './ServicioPrueba': './src/app/shared/services/servicio-prueba.ts',
    './MyComponentComponent': './src/app/views/my-component/my-component.component.ts',
    './ListUserComponent': './src/app/views/users/list-users/list-users.component',
    './UsersComponent': './src/app/views/users/users/users/users.component',
    './Signals': './src/app/views/signals/signals',
    './ParentComponent': './src/app/views/parent/parent.component',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
