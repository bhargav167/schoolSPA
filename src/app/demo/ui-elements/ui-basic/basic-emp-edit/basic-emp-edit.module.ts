import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicEmpEditComponent } from './basic-emp-edit.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicEmpEditRoutingModule } from './basic-emp-edit-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicEmpEditRoutingModule,
    BsDatepickerModule.forRoot(),
    NgbTabsetModule,
    ToastrModule.forRoot(),
    MultiSelectAllModule
  ],
  declarations: [BasicEmpEditComponent]
})
export class BasicEmpEditModule { }
