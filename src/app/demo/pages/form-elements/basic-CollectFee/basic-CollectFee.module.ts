import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCollectFeeComponent } from './basic-CollectFee.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BasicFeeCollectRoutingModule } from './basic-CollectFee-routing.module';

@NgModule({
  imports: [
    
    CommonModule,
    SharedModule, 
    NgbDropdownModule,
    BasicFeeCollectRoutingModule
  ],
  declarations: [BasicCollectFeeComponent]
})
export class BasicCollectFeeModule { }
