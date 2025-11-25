
import { Routes } from '@angular/router';
import { RemotoComponent } from './views/remoto/remoto.component';
import { ViejaComponent } from './views/vieja/vieja.component';
import { MyComponentComponent } from './views/my-component/my-component.component';
import { ListProductsComponent } from './views/products/list-products/list-products.component';
import { ListUserComponent } from './views/users/list-users/list-users.component';

export const routes: Routes = [
    { path: '',  redirectTo: '/masteraspnet', pathMatch: 'full' },
  {path: 'masteraspnet' , component: RemotoComponent},
  {path: 'remoto' , component: RemotoComponent},
  {path: 'vieja' , component: ViejaComponent},
  { path: 'component' , component: MyComponentComponent},
  { path: 'list-products' , component: ListProductsComponent},
  { path: 'list-users' , component: ListUserComponent},
];
