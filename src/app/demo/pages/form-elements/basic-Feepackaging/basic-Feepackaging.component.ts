import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { ToastrService } from 'ngx-toastr';
import { Class } from 'src/app/Models/Class';

@Component({
  selector: 'app-basic-Feepackaging',
  templateUrl: './basic-Feepackaging.component.html',
  styleUrls: ['./basic-Feepackaging.component.css']
})
export class BasicFeepackagingComponent implements OnInit {

  public btnLoader: boolean;
 
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel;
  FeeTypes; 
  allSec:Class;
sections:string[];
   constructor(private _classLevel:ClasslevelService,
    private _feeServices:FeeModulesService,
    private fb:FormBuilder,
    private toastr: ToastrService) 
    { }

  ngOnInit() {
  }
  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  }
  
  ClassChange(event) {
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(',');
      
    })
  }
}
