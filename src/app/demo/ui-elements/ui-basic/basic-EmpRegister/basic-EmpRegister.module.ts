import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicEmpRegisterComponent } from './basic-EmpRegister.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicEmpRegisterRoutingModule } from './basic-EmpRegister-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
 @NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    BasicEmpRegisterRoutingModule,
    MultiSelectAllModule
  ],
  declarations: [BasicEmpRegisterComponent]
})
export class BasicEmpRegisterModule { }
