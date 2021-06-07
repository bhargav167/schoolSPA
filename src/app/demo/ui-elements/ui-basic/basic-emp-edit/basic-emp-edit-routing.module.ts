import { Routes, RouterModule } from '@angular/router';
 import { NgModule } from '@angular/core';
import { BasicEmpEditComponent } from './basic-emp-edit.component';
const routes: Routes = [
  {
    path: '', 
    component: BasicEmpEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class BasicEmpEditRoutingModule { }
