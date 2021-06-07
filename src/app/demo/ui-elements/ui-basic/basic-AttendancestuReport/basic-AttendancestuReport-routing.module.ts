import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAttendancestuReportComponent } from './basic-AttendancestuReport.component';
 
const routes: Routes = [
  {
    path: '',
    component: BasicAttendancestuReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicAttendancestuReportRoutingModule { }
