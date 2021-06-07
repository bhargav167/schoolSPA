import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFeePackagingComponent } from './AddFeePackaging.component';
 
const routes: Routes = [
  {
    path: '',
    component: AddFeePackagingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddFeePackagingRoutingModule { }
