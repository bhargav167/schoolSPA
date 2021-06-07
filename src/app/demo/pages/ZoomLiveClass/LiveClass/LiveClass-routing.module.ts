import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LiveClassesComponent } from './LiveClasses.component';
 
const routes: Routes = [
  {
    path: '',
    component: LiveClassesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveClassRoutingModule { }