import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicEmpListComponent } from './basic-Emp-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicEmployeeListRoutingModule } from './basic-Emp-list-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbDropdownModule, NgbButtonsModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicEmployeeListRoutingModule,
    PaginationModule.forRoot(),
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule
  ],
  declarations: [BasicEmpListComponent]
})
export class BasicEmpListModule { 
}
