import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAdmissionComponent } from './basic-admission.component';
import { BasicAdmissionRoutingModule } from './basic-admission-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BasicAdmissionRoutingModule,
    SharedModule
  ],
  declarations: [BasicAdmissionComponent]
})
export class BasicAdmissionModule { } 
