import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicStuViewComponent } from './basic-stu-View.component';
  
const routes: Routes = [
  {
    path: '',
    component: BasicStuViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicStudentViewRoutingModule { }
