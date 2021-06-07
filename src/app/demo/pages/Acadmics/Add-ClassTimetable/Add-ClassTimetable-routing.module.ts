import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  
import { AddClassTimetableComponent } from './Add-ClassTimetable.component';
const routes: Routes = [
  {
    path: '',
    component: AddClassTimetableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddClassTimetableRoutingModule { }