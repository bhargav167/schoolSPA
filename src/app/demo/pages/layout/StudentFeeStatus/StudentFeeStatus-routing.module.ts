import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard'; 
import { StudentFeeStatusComponent } from './StudentFeeStatus.component';
 
const routes: Routes = [
  {
    path: '',
    component: StudentFeeStatusComponent,
    canActivate:[AuthGaurd],
    data:{permittedRoles:['Student']},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentFeeStatusRoutingModule { }
