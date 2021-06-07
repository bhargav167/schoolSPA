import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcadmicSectionComponent } from './Acadmic-Section.component';
import { AcadmicSectionRoutingModule } from './Acadmic-section-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AcadmicSectionRoutingModule
  ],
  declarations: [AcadmicSectionComponent]
})
export class AcadmicSectionModule { }
