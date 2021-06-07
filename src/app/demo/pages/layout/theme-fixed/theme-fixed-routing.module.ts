import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThemeFixedComponent} from './theme-fixed.component';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ThemeFixedComponent,
    canActivate:[AuthGaurd],
    data:{permittedRoles:['Admin']},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeFixedRoutingModule { }
