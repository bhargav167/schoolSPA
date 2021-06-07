import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/theme/shared/shared.module'; 
import { BasicEmpViewRoutingModule } from './basic-emp-View-routing.module';
import { BasicEmpViewComponent } from './basic-emp-View.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicEmpViewRoutingModule
  ],
  declarations: [BasicEmpViewComponent]
})
export class BasicEmpViewModule { }
