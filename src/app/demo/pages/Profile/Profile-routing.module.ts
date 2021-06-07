import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGaurd],
    children: [
      {
        path: 'AdminProfile',
        loadChildren: () => import('./AdminProfile/AdminProfile.module').then(module => module.AdminProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }