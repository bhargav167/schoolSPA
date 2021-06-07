import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard'; 
import { StuAttendanceComponent } from './StuAttendance.component';
  
const routes: Routes = [
  {
    path: '',
    component: StuAttendanceComponent,
    canActivate:[AuthGaurd],
    data:{permittedRoles:['Student']},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StuAttendanceRoutingModule { }
