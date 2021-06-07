import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAdmissionComponent } from './basic-admission.component';

const routes: Routes = [
  {
    path: '',
    component: BasicAdmissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicAdmissionRoutingModule { }
