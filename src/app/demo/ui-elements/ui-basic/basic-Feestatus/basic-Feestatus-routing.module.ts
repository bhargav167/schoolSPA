import { Routes, RouterModule } from '@angular/router';
 import { NgModule } from '@angular/core';
 import { BasicFeestatusComponent } from './basic-Feestatus.component';
 
const routes: Routes = [
  {
    path: '', 
    component: BasicFeestatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class BasicFeestatusRoutingModule { }
