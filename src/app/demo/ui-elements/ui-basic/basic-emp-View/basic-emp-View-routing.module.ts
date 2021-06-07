import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { BasicEmpViewComponent } from './basic-emp-View.component';
  
const routes: Routes = [
  {
    path: '',
    component: BasicEmpViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicEmpViewRoutingModule { }
