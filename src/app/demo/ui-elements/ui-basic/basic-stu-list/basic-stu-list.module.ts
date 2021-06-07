import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicStuListComponent } from './basic-stu-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicStudentListRoutingModule } from './basic-stu-list-routing.module';
 import { PaginationModule } from 'ngx-bootstrap/pagination';
import { stuQuickAdmission } from 'src/app/_resolver/stuQuickAdmission.resolver';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicStudentListRoutingModule,
    PaginationModule.forRoot(),
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule
  ],
  declarations: [BasicStuListComponent],
  providers: [stuQuickAdmission]
})
export class BasicStuListModule { }
