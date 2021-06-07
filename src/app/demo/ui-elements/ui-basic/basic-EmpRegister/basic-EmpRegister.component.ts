import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { ToastrService } from 'ngx-toastr';
import { EmpRegister } from 'src/app/Models/EmpRegister';
import { EmployeeService } from 'src/app/services/Employee.service';
  
@Component({
  selector: 'app-basic-EmpRegister',
  templateUrl: './basic-EmpRegister.component.html',
  styleUrls: ['./basic-EmpRegister.component.css']
})
export class BasicEmpRegisterComponent implements OnInit {
  
  // maps the local data column to fields property
  public localFields: Object = { text: 'classes', value: 'classes' };
    // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Select Classes';
  public btnLoader: boolean;
  registerStudent:FormGroup;
  selected=true;
  bsConfig: Partial<BsDatepickerConfig>;
  classLevels:any;
  allClasses:any;
  empRegister:EmpRegister;
  todaydate:any;
  RegistrationNo:any;
  empData:EmpRegister;
  constructor(private fb:FormBuilder,private _classLevel:ClasslevelService,
    private _empServices:EmployeeService,
    private toastr: ToastrService) {
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
        RegistrationNo:[this.RegistrationNo],
        EmpId:['',Validators.required],
        medium:['ENGLISH',Validators.required],
      })
    }
    getLastId(){
      this._empServices.getLastEmpRegisterId().subscribe((data:EmpRegister)=>{
        this.empData=data; 
      if(this.empData==null){ 
        this.RegistrationNo=1;
      }
         this.RegistrationNo=data.registrationNo;  
         
 this.RegistrationNo=parseInt(this.RegistrationNo)+1; 
       })
    }
    LevelChange(event){ 
      let Ids=event.target.value;
      this._classLevel.getClass(Ids).subscribe((data)=>{ 
        this.allClasses=data; 
      })
    }

    register() {
      this.btnLoader = true;  
       if (this.registerStudent.valid) {
        this.empRegister = Object.assign({}, this.registerStudent.value); 
        this.empRegister.registrationNo=this.RegistrationNo.toString();
        this._empServices.register(this.empRegister).subscribe(() => {
          this.toastr.success('Employee Registration Done!', 'Data Saved');
          this.registerStudent.reset();
          this.btnLoader = false;
          this.getLastId();
          this.createRegisterForm();
        }, error => {
          this.toastr.error('Employee Registration Failed!', 'Problem in saving Data',error);
          this.btnLoader = false;
        },()=>{ 
        });
      }
    }
}
