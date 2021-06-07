import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicCollectFeeComponent } from './basic-CollectFee.component';
  
const routes: Routes = [
  {
    path: '',
    component: BasicCollectFeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicFeeCollectRoutingModule { }
