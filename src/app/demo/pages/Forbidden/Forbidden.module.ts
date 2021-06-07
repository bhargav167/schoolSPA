import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './Forbidden.component';
import { ForbiddenRoutingModule } from './Forbidden-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ForbiddenRoutingModule
  ],
  declarations: [ForbiddenComponent]
})
export class ForbiddenModule { }