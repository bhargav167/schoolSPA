import { Component, OnInit } from '@angular/core';
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { FeeTerms } from 'src/app/Models/FeeTerms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basic-Feestatus',
  templateUrl: './basic-Feestatus.component.html',
  styleUrls: ['./basic-Feestatus.component.css']
})
export class BasicFeestatusComponent implements OnInit {
feeModule:FeeTerms;
Term1Fee:number=0;
Term2Fee:number=0;
Term1FeePaidAmt:number=0;
Term2FeePaidAmt:number=0;
Term1FeeDueAmt:number=0;
Term2FeeDueAmt:number=0; 
  constructor(private _feeModule:FeeModulesService,private _route:ActivatedRoute) { }

  ngOnInit() {
    this.loadFeeStaus();
  }
  loadFeeStaus() { 
    this._feeModule.getFeeStatus(+this._route.snapshot.params['id'],this._route.snapshot.params['standers'],this._route.snapshot.params['classsection'])
      .subscribe((res: FeeTerms) => {
        this.feeModule=res;  
        this.feeModule.feeParticular.forEach(element => { 
          element.Term1 =  element.Term1;
          element.Term12 =  element.Term12;
          element.Term1DueAmt =   element.Term1DueAmt;
          element.Term2DueAmt =   element.Term2DueAmt;
          element.Term1Paid =  element.Term1Paid;
          element.Term2Paid =   element.Term2Paid;

           this.Term1Fee=this.Term1Fee+element.Term1;
           this.Term2Fee=this.Term2Fee+element.Term12;

           this.Term1FeePaidAmt+=element.Term1DueAmt;
           this.Term2FeePaidAmt+=element.Term2DueAmt

          this.Term1FeeDueAmt+=element.Term1Paid;
          this.Term2FeeDueAmt+=element.Term2Paid;

        });
      }, error => { 
      console.log(error); 
      });
  }
}
