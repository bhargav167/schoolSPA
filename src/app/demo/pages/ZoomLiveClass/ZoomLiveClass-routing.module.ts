import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGaurd],
    children: [
      {
        path: 'LiveClass',
        loadChildren: () => import('./LiveClass/LiveClasses.module').then(module => module.LiveClassesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoomLiveClassRoutingModule { }