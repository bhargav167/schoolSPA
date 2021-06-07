import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicFeepackagingComponent } from './basic-Feepackaging.component';
  
const routes: Routes = [
  {
    path: '',
    component: BasicFeepackagingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicFeesPackagingRoutingModule { }
