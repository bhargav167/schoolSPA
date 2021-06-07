import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcadmicSubjectComponent } from './Acadmic-Subject.component';
import { AcadmicSubjectRoutingModule } from './Acadmic-Subject-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AcadmicSubjectRoutingModule
  ],
  declarations: [AcadmicSubjectComponent]
})
export class AcadmicSubjectModule { }
