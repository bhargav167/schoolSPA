import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcadmicClassesComponent } from './Acadmic-Classes.component';
import { AcadmicClassRoutingModule } from './Acadmic-Classes-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    AcadmicClassRoutingModule
  ],
  declarations: [AcadmicClassesComponent]
})
export class AcadmicClassesModule { }
