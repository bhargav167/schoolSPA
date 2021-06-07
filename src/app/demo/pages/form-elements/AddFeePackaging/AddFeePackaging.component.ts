import { Component, OnInit, ViewChild } from '@angular/core';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'; 
import { FeeTerms } from 'src/app/Models/FeeTerms';
import { FeeParticular } from 'src/app/Models/FeeParticular';
import { Class } from 'src/app/Models/Class';
  
@Component({
  selector: 'app-AddFeePackaging',
  templateUrl: './AddFeePackaging.component.html',
  styleUrls: ['./AddFeePackaging.component.css']
})
export class AddFeePackagingComponent implements OnInit {
  public btnLoader: boolean;  
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel;
  FeeTypes:FeeParticular;
  FeeTerms:FeeTerms;
  allSec:Class;
sections:string[];
  showData:boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  date:any;
  constructor(private _classLevel:ClasslevelService,
    private _feeServices:FeeModulesService,
    private fb:FormBuilder,
    private toastr: ToastrService) 
    { }

  ngOnInit() {  
    this.bsConfig = {
      containerClass: 'theme-red'
    };
  }

  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  }

  GetFeeTypes() {
    this._feeServices.getFeeTypes(this.selectedLevel).subscribe((data:FeeParticular) => { 
      this.FeeTypes=data;  
     this.date= this.FeeTypes[0].term2From;
      if(!this.FeeTypes){
        this.showData=false; 
      }else{  
        this.showData=true;
      } 
    }); 
  } 
  

  onOptionsSelected(event){
    this.selectedLevel=event.target.value;  
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(',');
      
    })
   }  

  updateFeeTerms() { 
    this._feeServices.UpdateTermsWise(this.FeeTypes).subscribe(data => {
      this.toastr.success("Term Fee Updated", "Updated Successfully");
    }, error => {
      this.toastr.error("Term Fee Updated Failed", error.error); 
    }
    )
  } 

     
  
}
