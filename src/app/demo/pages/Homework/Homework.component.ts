import { Component, OnInit, ViewChild} from '@angular/core';
import { Class } from 'src/app/Models/Class';
import { SubjectGroup } from 'src/app/Models/SubjectGroup';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { HomeWorkService } from 'src/app/services/Homework/homeWork.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Homework } from 'src/app/Models/Homework/Homework';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
 @Component({
  selector: 'app-Homework',
  templateUrl: './Homework.component.html',
  styleUrls: ['./Homework.component.scss']
})
export class HomeworkComponent implements OnInit {
  public btnLoader: boolean;
  registerHomework:FormGroup;
  homework:Homework;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("ckeditor",{static:false}) ckeditor: any;
  classLevels:any;
  allClasses:any;
  selected=true;
  valtoselect='-1';
  valtoselect1='-1';
  valtoselect2='-1';
  valtoselect3='-1';
  selectedLevel:string=null;
  selectedsec:string=null;
  todaydate:any;
  allSec:Class;
sections:string[];
subjects:string[];
homeworklist:Homework[]=[];
currentselectedsubjected:string=null;
bsConfig: Partial<BsDatepickerConfig>;
  constructor(private _classLevel:ClasslevelService,
    private fb:FormBuilder,
    private http:HttpClient,
    private _homeworkServices:HomeWorkService,
    private toastr: ToastrService
    ) { this.mycontent = `<p>Hh</p>`; 
    this.btnLoader = false;
  }

  ngOnInit() {
    this.ckeConfig = {
      removePlugins: 'undo'
    };
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.todaydate = new Date();
    var dd = String(this.todaydate.getDate()).padStart(2, '0');
    var mm = String(this.todaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.todaydate.getFullYear(); 
    this.todaydate = yyyy + '-' + mm + '-' + dd;
    this.createRegisterForm(); 
  }
  createRegisterForm(){
    this.registerHomework=this.fb.group({
      Id:[0,[Validators.required]],
      ClassGroup:[this.valtoselect,[Validators.required]],
      Classes:[this.valtoselect1,[Validators.required]],
      Section:[this.valtoselect2,[Validators.required]],
      Subject:[this.valtoselect3,Validators.required],
      SubGroup:['',Validators.required],
      HomeworkDate:[this.todaydate,Validators.required],
      SubmissionDate:[this.todaydate,Validators.required],
      docfilename:[''],
      Description:['',Validators.required]
    })
  } 
   getAllHomework() {
    this.homeworklist=[];
     this._homeworkServices.getAllhomework(this.selectedLevel, this.selectedsec,this.currentselectedsubjected).subscribe((data: Homework[]) => {
       this.homeworklist = data;
     })
   }
  LevelChange(event){ 
    this.valtoselect1='-1';
    let Ids=event.target.value; 
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  } 
  Clear(){ 
    this.registerHomework.reset();
    this.valtoselect='-1';
    this.valtoselect1='-1';
    this.valtoselect2='-1';
    this.valtoselect3='-1';
    this.allClasses=[];
    this.sections=[];
    this.subjects=[];
    this.registerHomework.get('ClassGroup').setValue(this.valtoselect);
    this.registerHomework.get('Classes').setValue(this.valtoselect1);
    this.registerHomework.get('Section').setValue(this.valtoselect2);
    this.registerHomework.get('Subject').setValue(this.valtoselect3);
    this.AssignTodayday();
  }
  onOptionsSelected(event){
    this.valtoselect2='-1';
    this.selectedLevel=event.target.value;  
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(',');
    })
   }
   onOptionsSelectedSec($event){  
    this.valtoselect3='-1';
    this.selectedsec=$event.target.value; 
     this._homeworkServices.getSubjects(this.selectedLevel, this.selectedsec).subscribe((data: SubjectGroup) => {
       this.registerHomework.get('SubGroup').setValue(data[0].SubjectName);
       this.subjects = data[0].Subject.split(',');
     }, err => {
       console.log(err);
     })
  }
  onOptionsSelectedSub($event){
    this.currentselectedsubjected=$event.target.value; 
  }
  AssignTodayday(){
    this.todaydate = new Date();
    var dd = String(this.todaydate.getDate()).padStart(2, '0');
    var mm = String(this.todaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.todaydate.getFullYear(); 
    this.todaydate = yyyy + '-' + mm + '-' + dd;
    this.registerHomework.get('HomeworkDate').setValue(new Date(this.todaydate));
    this.registerHomework.get('SubmissionDate').setValue(new Date(this.todaydate));
  }
  registerHW(){
     if(this.registerHomework.valid){
      this.btnLoader=true;
      this.homework = Object.assign({}, this.registerHomework.value); 
      this._homeworkServices.PostHomework(this.homework).subscribe((data:Homework)=>{
        if(this.homework.Id!=0)
      return  this.toastr.success('Done','Homework updated successfully');

        this.toastr.success('Done','Homework assign successfully');
      this.Clear();
        this.btnLoader=false;
        this.registerHomework.reset();
        this.createRegisterForm();
        this.AssignTodayday();
      },err=>{
        this.toastr.success('Opps!','Homework assign failed');
        this.btnLoader=false;
        this.registerHomework.reset();
        this.createRegisterForm();
        this.AssignTodayday();
      })
      this.btnLoader=false;
     }
  } 
   Edit(Id: number) {
     this._classLevel.getClass(1).subscribe((data) => {
       this.allClasses = data;
     })
    
     this._homeworkServices.getHomeworkById(Id).subscribe((data: Homework) => {
       this._classLevel.getSection(data.Classes).subscribe((data:Class) => {
        this.allSec = data;
       this.sections= this.allSec.sections.split(',');
      })
      this._homeworkServices.getSubjects(data.Classes, data.Section).subscribe((data: SubjectGroup) => {
       
        this.registerHomework.get('SubGroup').setValue(data[0].SubjectName);
        this.subjects = data[0].Subject.split(',');
      }, err => {
        console.log(err);
      })
      this.registerHomework.get('Id').setValue(data.Id);
      this.registerHomework.get('ClassGroup').setValue(data.ClassGroup);
       this.registerHomework.get('Classes').setValue(data.Classes);
       this.registerHomework.get('Section').setValue(data.Section);
       this.registerHomework.get('Subject').setValue(data.Subject);
       this.registerHomework.get('Description').setValue(data.Description);
       this.registerHomework.get('HomeworkDate').setValue(new Date(data.HomeworkDate));
       this.registerHomework.get('SubmissionDate').setValue(new Date(data.SubmissionDate));
      
     })
   }
   Delete(id: number) {
     Swal.fire({
       title: 'Are you sure?',
       text: 'You will not be able to recover this Record!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#ff5858',
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it',
     }).then((result) => {

       if (result.isConfirmed) {
         this._homeworkServices.DeleteHomework(id).subscribe(() => {
           this.toastr.success('Done', 'Homework Deleted Successfully.');
           this.
             getAllHomework();
         })
       } else if (result.isDismissed) {
         return;
       }
     })
   }
  public uploadFile = (files) => { 
    if (files.length === 0) {
      return;
    }
 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.registerHomework.get('docfilename').setValue(fileToUpload.name);
    this.http.post(environment.apiUrl+`Homework/Upload`, formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

      }
      else if (event.type === HttpEventType.Response) {

      }
    });
    
  }
}
