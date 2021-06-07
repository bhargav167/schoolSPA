import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicEmpRegisterComponent } from './basic-EmpRegister.component';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';
  
const routes: Routes = [
  {
    path: '', 
    component: BasicEmpRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicEmpRegisterRoutingModule { }
