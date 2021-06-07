import { Component, OnInit, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { NgForm,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { stuEduDetails } from 'src/app/Models/stuEduDetails';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuthRegister } from 'src/app/Models/AuthRegister';
import { AuthService } from 'src/app/services/AuthServices/Auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-basic-stu-edit',
  templateUrl: './basic-stu-edit.component.html',
  styleUrls: ['./basic-stu-edit.component.css']
})
export class BasicStuEditComponent implements OnInit {
studentEdu:stuEduDetails;
students:QuickAdmission; 
gender:string;
clasLevel:string;
selected=true; 
classLevels:any;
allClasses:any;
isChange:boolean=false;
public btnLoader: boolean;
public btnLoader1: boolean; 
formModel:FormGroup;
authRegister:AuthRegister;
public progress: number;
public message: string;
role:string='Student';
@Output() public onUploadFinished = new EventEmitter();
@ViewChild('studentForm', {static: true}) studentForm: NgForm;
@ViewChild('eduForm', {static: true}) eduForm: NgForm;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.studentForm.dirty) {
    $event.returnValue = true;
  }
}
  constructor(private http: HttpClient,private _route:ActivatedRoute,
    private _classLevel:ClasslevelService,private _authServices:AuthService,
     private fb:FormBuilder,private toastr: ToastrService) { 
    this.btnLoader1 = false;
    this.btnLoader = false;}

  ngOnInit() {  
    this.createPost();
    this._classLevel.getQuickStudent(this._route.snapshot.params['UserId']).subscribe((user: QuickAdmission) => {
      this.students = user;
      this.AssignSelectedDropDown(); 
      this.LevelChangeOnLoad(+this.students.classLevel);  
     
    }, error => { 
    }) 
    this._classLevel.getEduStudent(this._route.snapshot.params['UserId']).subscribe((eduStudent: stuEduDetails) => { 
      this.studentEdu = eduStudent;
     
    }, error => {
    }) 
    this.IsCred();
  }

  createPost(){
    this.formModel =this.fb.group({
      UserId:['0',Validators.required], 
      UserName:['',Validators.required], 
      Password:['',Validators.required]
    }) 
  }

  public uploadFile = (files) => { 
    if (files.length === 0) {
      return;
    }
 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.http.post(environment.apiUrl+`QuickAdmission/${this._route.snapshot.params['UserId']}/Upload`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  } 


  updateStudent(){ 
    this.btnLoader = true;
    this._classLevel.updateAdmission(this._route.snapshot.params['UserId'],this.students).subscribe(next=>{
      this.toastr.success('Student Details Updated!', 'Data Saved');
      this.btnLoader = false;
     this.studentForm.reset(this.students); 
    },error=>{ 
      this.toastr.error('Error in updating!', 'Failed');
      this.btnLoader = false; 
    })
   } 
   
   //Assign Login Details
   Save() { 
    this.btnLoader = true;  
     if (this.formModel.valid) {
      this.authRegister = Object.assign({}, this.formModel.value);
     if(this.authRegister.Id==0){
      this._authServices.Sturegister(this.authRegister,this.role,this.students.admissionNo).subscribe(() => {
        this.toastr.success('Role Assigned!', 'Data Saved');
        this.formModel.reset();
        this.btnLoader = false;
        this.createPost();
      }, error => {
        this.toastr.error('Role Assigned Failed!', 'Problem in saving Data',error);
        this.btnLoader = false;
      },()=>{ 
      });
     }else{
       
     }
    }
  }
   
  registerEduDetails() {
    this.btnLoader1 = true; 
    this.studentEdu.stuId=this._route.snapshot.params['UserId']; 
    this._classLevel.registerUpdateEdu(this._route.snapshot.params['UserId'],this.studentEdu).subscribe(next=>{
      this.toastr.success('Student Educational Details Updated!', 'Data Saved');
      this.btnLoader1 = false; 
    },error=>{ 
      this.toastr.error('Error in updating!', 'Failed');
      this.btnLoader1 = false;
    }) 
  }

  AssignSelectedDropDown(){
        
    if (this.students.classLevel == '1') {
      this.clasLevel = 'Junior';
    }
    if (this.students.classLevel == '2') {
      this.clasLevel = 'Senior';
    }



    if (this.students.gender == "1") {
      this.gender = 'Male'
    }
    if (this.students.gender == "2") {
      this.gender = 'Female'
    }
    if (this.students.gender == "3") {
      this.gender = 'Other'
    }
  }

  LevelChange(event){ 
    this.isChange=true;
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data;
    })
  }

  LevelChangeOnLoad(id:number){  
    this._classLevel.getClass(id).subscribe((data)=>{ 
      this.allClasses=data;
      
    })
  }
  
// check phoneNo contain alphabet
checkAlpha(event) {
  let val = event.target.value;
  if (isNaN(val)) {
    let str = val.substring(0, val.length - 1);
    event.target.value = str;
  }
} 
IsCred(){
  this._classLevel.getCred(this._route.snapshot.params['UserId']).subscribe((data:any)=>{
  if(data!=null){
    this.formModel.get('UserName').setValue(data.UserName);
    this.formModel.get('UserId').setValue(data.Id);
  }else{ 
    this.formModel.get('UserId').setValue('0');
  }
  
  })
}
}
