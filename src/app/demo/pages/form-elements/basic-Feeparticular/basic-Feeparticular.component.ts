import { Component, OnInit, ViewChild } from '@angular/core';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FeeParticular } from 'src/app/Models/FeeParticular';
import { ToastrService } from 'ngx-toastr';
import { Class } from 'src/app/Models/Class';

@Component({
  selector: 'app-basic-Feeparticular',
  templateUrl: './basic-Feeparticular.component.html',
  styleUrls: ['./basic-Feeparticular.component.css']
})
export class BasicFeeparticularComponent implements OnInit {
  public btnLoader: boolean;
  FeeParticular:FormGroup;
  feeParticular:FeeParticular;
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel;
  allSec:Class;
sections:string[];
  EditData:FeeParticular;
  FeeTypes; 
  @ViewChild('FeeForm', {static: true}) FeeForm: NgForm;
  constructor(private _classLevel:ClasslevelService,
    private _feeServices:FeeModulesService,
    private fb:FormBuilder,
    private toastr: ToastrService) 
    { }

  ngOnInit() {
    this.createFeeParticularForm();
  }
  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  } 
  createFeeParticularForm(){
    this.FeeParticular = this.fb.group({
      classLevel: ['', Validators.required],
      Stander: ['', Validators.required],
      Section: ['', Validators.required],
      feeType: ['', Validators.required],
      feeAmt: ['', Validators.required]
    })
  } 

  saveFee() {
    this.btnLoader = true;  
     if (this.FeeParticular.valid) {
       this.feeParticular= Object.assign({}, this.FeeParticular.value);
       this._feeServices.registerOne(this.feeParticular).subscribe(()=>{
        this.toastr.success('Fee Particular Created!', 'Data Saved'); 
        this.createFeeParticularForm();
        this.btnLoader = false;
       },error=>{
        this.toastr.error('Error In Fee Particular Creating!', 'Data Not Saved');
        this.btnLoader = false;
       }) 
    }
  }

  //Update FeeModule
  UpdateFee() {
    this.btnLoader = true;  
       this._feeServices.register(this.EditData).subscribe(()=>{
        this.toastr.success('Fee Particular Created!', 'Data Updated'); 
        this.btnLoader = false;
        this.GetFeeTypes(); 
       },error=>{
        this.toastr.error('Error In Fee Particular Updating!', 'Data Not Updated');
        this.btnLoader = false;
       }) 
   
  }
  
  GetFeeTypes() { 
    this._feeServices.getFeeTypes(this.selectedLevel).subscribe((data) => { 
      this.FeeTypes=data; 
    }); 
  }

  GetEdit(id: number) { 
    this._feeServices.getFeeParticular(id).subscribe((data:FeeParticular) => {
     this.EditData=data;  
    })
  }

  onOptionsSelected(event){
    this.selectedLevel=event.target.value;  
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(',');
      
    })
   }

}
