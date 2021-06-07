import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { ToastrService } from 'ngx-toastr';
import { Class } from 'src/app/Models/Class';

@Component({
  selector: 'app-basic-student',
  templateUrl: './basic-student.component.html',
  styleUrls: ['./basic-student.component.css']
})
export class BasicStudentComponent implements OnInit {
public btnLoader: boolean;
registerStudent:FormGroup;
selected=true;
bsConfig: Partial<BsDatepickerConfig>;
classLevels:any;
allClasses:any;
allSec:Class;
sections:string[];
quickAdmission:QuickAdmission;
todaydate:any;
admissionNo:any;
constructor(private fb:FormBuilder,private _classLevel:ClasslevelService,private toastr: ToastrService) {
  this.btnLoader = false;
 }

  ngOnInit() { 
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.todaydate = new Date();
    var dd = String(this.todaydate.getDate()).padStart(2, '0');
    var mm = String(this.todaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.todaydate.getFullYear(); 
    this.todaydate = mm + '/' + dd + '/' + yyyy;
   
    this.createRegisterForm();
    this.getLastId();
  }

  createRegisterForm(){
    this.registerStudent=this.fb.group({
      firstName:['',[Validators.required,Validators.maxLength(12),Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.maxLength(12),Validators.minLength(3)]],
      email:['',[Validators.required,Validators.maxLength(25),Validators.minLength(14)]],
      gender:['',Validators.required],
      dob:['',Validators.required],
      doa:[this.todaydate],
      motherTongue:['HINDI',Validators.required],
      nationality:['INDIAN',Validators.required],
      fathername:['',Validators.required],
      phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      classLevel:['',Validators.required],
      standers:['',Validators.required],
      classsection:['',Validators.required],
      admissionno:[this.admissionNo],
      rollno:['',Validators.required],
      medium:['ENGLISH',Validators.required],
    })
  } 

  LevelChange(event) {
    let Ids = event.target.value;
    this._classLevel.getClass(Ids).subscribe((data) => {
      this.allClasses = data;
    })
  }

  ClassChange(event) {
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(',');
      
    })
  }

register() { 
  if (this.registerStudent.controls['standers'].value == "--Select--") 
  return this.toastr.warning("Please Select Correct Class");
  
  this.btnLoader = true;  
   if (this.registerStudent.valid) {
    this.quickAdmission = Object.assign({}, this.registerStudent.value); 
    this.quickAdmission.admissionNo=this.admissionNo.toString();
    this._classLevel.register(this.quickAdmission).subscribe(() => {
      this.toastr.success('Quick Admission Done!', 'Data Saved');
      this.registerStudent.reset();
      this.btnLoader = false;
      this.getLastId();
      this.createRegisterForm();
    }, error => { 
      this.toastr.error('Quick Admission Failed!', 'Problem in saving Data',error);
      this.btnLoader = false;
    },()=>{ 
    });
  }
}

// check phoneNo contain alphabet
  checkAlpha(event) {
    let val = event.target.value;
    if (isNaN(val)) {
      let str = val.substring(0, val.length - 1);
      event.target.value = str;
    }
    
}
getLastId(){
  this._classLevel.getLastAdmissionId().subscribe((data:QuickAdmission)=>{ 
  if(data==null){
    this.admissionNo=1;
  }
     this.admissionNo=data.admissionNo; 
 this.admissionNo=parseInt(this.admissionNo)+1; 
   })
}

}
