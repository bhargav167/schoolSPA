import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  
import { AcadmicClassTimetableComponent } from './Acadmic-ClassTimetable.component';
 
const routes: Routes = [
  {
    path: '',
    component: AcadmicClassTimetableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcadmicClassTimetableRoutingModule { }