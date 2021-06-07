import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { HomeworkComponent } from './Homework.component';
 
const routes: Routes = [
  {
    path: '',
    component: HomeworkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworkRoutingModule {}