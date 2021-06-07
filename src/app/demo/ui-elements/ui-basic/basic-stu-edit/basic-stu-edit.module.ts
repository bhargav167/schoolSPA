import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { SharedModule } from 'src/app/theme/shared/shared.module';
 import { BasicStudentEditRoutingModule } from './basic-stu-edit-routing.module';
import { BasicStuEditComponent } from './basic-stu-edit.component';
import { stuQuickAdmissionEdit } from 'src/app/_resolver/stuQuickAdmissionEdit.resolver';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { PreventUnsavedChanges } from 'src/app/_gaurd/PreventUnsavedChanges.guard';
 
@NgModule({
  imports: [
  CommonModule,
  SharedModule,
  BasicStudentEditRoutingModule,
  BsDatepickerModule.forRoot(),
  NgbTabsetModule,
  ToastrModule.forRoot()
  ],
  declarations: [BasicStuEditComponent],
  providers:[stuQuickAdmissionEdit]
})
export class BasicStuEditModule { }
