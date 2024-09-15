
import { Routes } from '@angular/router';
import { RemotoComponent } from './views/remoto/remoto.component';

export const routes: Routes = [
    { path: '',  redirectTo: '/masteraspnet', pathMatch: 'full' },
  {path: 'masteraspnet' , component: RemotoComponent},
  {path: 'remoto' , component: RemotoComponent}
];
