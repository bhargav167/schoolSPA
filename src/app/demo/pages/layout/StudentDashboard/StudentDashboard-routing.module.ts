import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';
import { StudentDashboardComponent } from './StudentDashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    canActivate:[AuthGaurd],
    data:{permittedRoles:['Student']},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentDashboardRoutingModule { }
