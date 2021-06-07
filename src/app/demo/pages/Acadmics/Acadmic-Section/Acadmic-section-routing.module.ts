import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  
import { AcadmicSectionComponent } from './Acadmic-Section.component';
 
const routes: Routes = [
  {
    path: '',
    component: AcadmicSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcadmicSectionRoutingModule { }