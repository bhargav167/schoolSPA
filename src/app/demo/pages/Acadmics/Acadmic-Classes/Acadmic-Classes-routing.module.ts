import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AcadmicClassesComponent } from './Acadmic-Classes.component';
 
const routes: Routes = [
  {
    path: '',
    component: AcadmicClassesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcadmicClassRoutingModule { }