import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFeestatusComponent } from './basic-Feestatus.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicFeestatusRoutingModule } from './basic-Feestatus-routing.module';
import { NgbProgressbarModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicFeestatusRoutingModule, 
    NgbProgressbarModule,
    NgbPopoverModule
  ],
  declarations: [BasicFeestatusComponent]
})
export class BasicFeestatusModule { }
