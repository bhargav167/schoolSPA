import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicStudentComponent } from './basic-student.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicStudentRoutingModule } from './basic-student-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
 @NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicStudentRoutingModule, 
     BsDatepickerModule.forRoot(),
     ToastrModule.forRoot()
  ],
  declarations: [BasicStudentComponent]
})
export class BasicStudentModule { }
