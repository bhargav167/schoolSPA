import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { SubjectGroupComponent } from './SubjectGroup.component';
const routes: Routes = [
  {
    path: '',
    component:SubjectGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectGroupRoutingModule { }