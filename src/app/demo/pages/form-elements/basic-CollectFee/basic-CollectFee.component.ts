import { Component, OnInit } from '@angular/core';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { AmtPaidInTerms } from 'src/app/Models/AmtPaidInTerms';
import { FeeParticular } from 'src/app/Models/FeeParticular';
import { ToastrService } from 'ngx-toastr';
import { Class } from 'src/app/Models/Class';

@Component({
  selector: 'app-basic-CollectFee',
  templateUrl: './basic-CollectFee.component.html',
  styleUrls: ['./basic-CollectFee.component.css']
})
export class BasicCollectFeeComponent implements OnInit {
  public btnLoader: boolean; 
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel; 
  stuIdSelected;
  allStudentOfClass:any;
  allSec:Class;
sections:string[];
  showData:boolean;
  FeeTypes:FeeParticular[];
  PaidAmt:AmtPaidInTerms;
  disable;

  constructor(private _classLevel:ClasslevelService,private _feeService: FeeModulesService,private toastr: ToastrService) { }

  ngOnInit() { 
  }

  //Level Chance
  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data;  
    })
  }
  //Class Chance
  onOptionsSelected(event){ 
    this.selectedLevel=event.target.value;  
    this._classLevel.getSection(this.selectedLevel).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(','); 
    })
   } 

   onOptionsSelectedStudents(event){
    this.stuIdSelected=event.target.value;  
   } 

   GetFeeTypes() {
    this._feeService.getFeeTypes(this.selectedLevel,this.stuIdSelected).subscribe((data:FeeParticular[]) => { 
      this.FeeTypes=data;  
      if(!this.FeeTypes){
        this.showData=false; 
      }else{
        this.showData=true;
      } 
    }); 
  }

  //Section Chance
   getStuByClassSelect(event){
     this._feeService.getStuByClass(this.selectedLevel,event.target.value).subscribe((data:Response)=>{
       this.allStudentOfClass=data; 
     })
   } 
 

   // Pay Term-1
  PayInTerms(){  
  for (let index = 0; index < this.FeeTypes.length; index++) {
    this.FeeTypes[index].stuId = this.stuIdSelected;  
  }
    this._feeService.CollectFees(this.FeeTypes).subscribe(data => {
      this.toastr.success("Term Fee Collected", "Updated Successfully");
      this.GetFeeTypes();
    }, error => {
      this.toastr.error("Failed to collect term fee", error.error); 
    })
  }

  // Pay Term-2
  PayInTerm(){ 
    for (let index = 0; index < this.FeeTypes.length; index++) {
      this.FeeTypes[index].stuId = this.stuIdSelected; 
    }
    this._feeService.CollectFeesTerm2(this.FeeTypes).subscribe(data => {
      this.toastr.success("Term Fee Collected", "Updated Successfully");
      this.GetFeeTypes();
    }, error => {
      this.toastr.error("Failed to collect term fee", error.error);
    }
      )
  }
}
