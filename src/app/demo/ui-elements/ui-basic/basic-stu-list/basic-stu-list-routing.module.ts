import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicStuListComponent } from './basic-stu-list.component';
 
const routes: Routes = [
  {
    path: '',
    component: BasicStuListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicStudentListRoutingModule { }
