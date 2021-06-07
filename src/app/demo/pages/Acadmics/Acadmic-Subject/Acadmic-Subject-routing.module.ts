import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
import { AcadmicSubjectComponent } from './Acadmic-Subject.component';
 
const routes: Routes = [
  {
    path: '',
    component: AcadmicSubjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcadmicSubjectRoutingModule { }