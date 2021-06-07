import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicStuViewComponent } from './basic-stu-View.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicStudentViewRoutingModule } from './basic-stu-View-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicStudentViewRoutingModule
  ],
  declarations: [BasicStuViewComponent]
})
export class BasicStuViewModule { }
