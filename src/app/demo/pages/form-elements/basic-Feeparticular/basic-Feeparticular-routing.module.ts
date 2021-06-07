import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicFeeparticularComponent } from './basic-Feeparticular.component';
 
const routes: Routes = [
  {
    path: '',
    component: BasicFeeparticularComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicFeesRoutingModule { }
