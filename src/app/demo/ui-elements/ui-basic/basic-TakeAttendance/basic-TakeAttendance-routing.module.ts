import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTakeAttendanceComponent } from './basic-TakeAttendance.component';
  
const routes: Routes = [
  {
    path: '',
    component: BasicTakeAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicTakeAttendanceRoutingModule { }
