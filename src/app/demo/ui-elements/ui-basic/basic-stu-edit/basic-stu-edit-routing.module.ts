import { Routes, RouterModule } from '@angular/router';
import { BasicStuEditComponent } from './basic-stu-edit.component';
import { NgModule } from '@angular/core';
import { PreventUnsavedChanges } from 'src/app/_gaurd/PreventUnsavedChanges.guard';
 
const routes: Routes = [
  {
    path: '', 
    component: BasicStuEditComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class BasicStudentEditRoutingModule { }
