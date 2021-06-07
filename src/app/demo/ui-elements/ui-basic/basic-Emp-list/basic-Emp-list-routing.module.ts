import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicEmpListComponent } from './basic-Emp-list.component';
  
const routes: Routes = [
  {
    path: '',
    component: BasicEmpListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicEmployeeListRoutingModule { }
