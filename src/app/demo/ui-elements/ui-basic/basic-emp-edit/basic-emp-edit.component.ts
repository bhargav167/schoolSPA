import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmpRegister } from 'src/app/Models/EmpRegister';
import { NgForm, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/Employee.service';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager,Query } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-basic-emp-edit',
  templateUrl: './basic-emp-edit.component.html',
  styleUrls: ['./basic-emp-edit.component.css']
})
export class BasicEmpEditComponent implements OnInit {
  Employee:EmpRegister; 
  gender:string;
  clasLevel:string;
  selected=true; 
  classLevels:any;
  allClasses:any;
  isChange:boolean=false;
  public btnLoader: boolean;
  public btnLoader1: boolean; 
  
  public progress: number;
  public message: string;
  public localFields: Object = { text: 'classes', value: 'classes' };
  // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Select Classes';
  @Output() public onUploadFinished = new EventEmitter();
  
  
  @ViewChild('studentForm', {static: true}) studentForm: NgForm;
  @ViewChild('eduForm', {static: true}) eduForm: NgForm;
  constructor(private http: HttpClient,
    private _route:ActivatedRoute,
    private _empServices:EmployeeService, 
    private fb:FormBuilder,
    private _classLevel:ClasslevelService,
    private toastr: ToastrService) { 
    this.btnLoader1 = false;
    this.btnLoader = false;}

  ngOnInit() { 
    this._empServices.getEmp(+this._route.snapshot.params['id']).subscribe((user: EmpRegister) => { 
      this.Employee = user; 
      console.log(this.Employee); 
      this.AssignSelectedDropDown(); 
      this.LevelChangeOnLoad(+this.Employee.classLevel);  
    }, error => {
    }) 
  }
  AssignSelectedDropDown(){ 
    if (this.Employee.classLevel == '1') {
      this.clasLevel = 'Junior';
    }
    if (this.Employee.classLevel == '2') {
      this.clasLevel = 'Senior';
    } 
    if (this.Employee.gender == "1") {
      this.gender = 'Male'
    }
    if (this.Employee.gender == "2") {
      this.gender = 'Female'
    }
    if (this.Employee.gender == "3") {
      this.gender = 'Other'
    }
  }
  LevelChangeOnLoad(id:number){  
    this._classLevel.getClass(id).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  }
  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  }
  updateEmployee(){  
    this.btnLoader = true;
    this._empServices.updateEmployee(this.Employee.EmpId,this.Employee).subscribe(next=>{
      this.toastr.success('Employee Details Updated!', 'Data Saved');
      this.btnLoader = false;
     this.studentForm.reset(this.Employee); 
    },error=>{ 
      this.toastr.error('Error in updating!', 'Failed');
      this.btnLoader = false;
    })
    }
    public uploadFile = (files) => { 
      if (files.length === 0) {
        return;
      }
   
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
   
      this.http.post(environment.apiUrl+`Employee/${this._route.snapshot.params['id']}/Upload`, formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        });
    } 
}
