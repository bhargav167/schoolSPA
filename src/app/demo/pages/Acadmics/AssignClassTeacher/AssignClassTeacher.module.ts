import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignClassTeacherComponent } from './AssignClassTeacher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignClassTeacherRoutingModule } from './AssignClassTeacher-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AssignClassTeacherRoutingModule
  ],
  declarations: [AssignClassTeacherComponent]
})
export class AssignClassTeacherModule { }
