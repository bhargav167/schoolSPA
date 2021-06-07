import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicStudentComponent} from './basic-student.component';
 
const routes: Routes = [
  {
    path: '',
    component: BasicStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicStudentRoutingModule { }
