import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { Section } from 'src/app/Models/Section';
import { Subject } from 'src/app/Models/Subject';
import { SubjectGroup } from 'src/app/Models/SubjectGroup';
import { ClassesService } from 'src/app/services/Acadmics/Classes.service';
import { SubjectService } from 'src/app/services/Acadmics/Subject.service';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-SubjectGroup',
  templateUrl: './SubjectGroup.component.html',
  styleUrls: ['./SubjectGroup.component.scss']
})
export class SubjectGroupComponent implements OnInit { 
  allClasses: any;
  sec:any[]=[];
  sub:any[]=[];
  subject:any[]=[];
  selectedLevel:string;
  allSubject:Subject[];
  editsubject:string[]=[]; 
  allSec: any;
  sections: string[]=[];
  ediSections: string[]=[];
  selectedItemsList = [];
  selectedItemsListSub = [];
  registerClass:FormGroup;
  subjectGrp:SubjectGroup;
  subGroupData:SubjectGroup[];
  editsubjectGrp:SubjectGroup;
  public btnLoader: boolean; 
  seccheck:boolean;
  Id: number;
  constructor( private _classLevel: ClasslevelService,
    private _classServices: ClassesService,
    private _subjectServices:SubjectService,
    private toastr: ToastrService,
    private fb:FormBuilder) { }
  createRegisterClass() {
    this.registerClass = this.fb.group({
      Id: [0],
      SubjectName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      classes: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subject: ['', [Validators.required]]
    })
  } 
  loadSubjectGroupList(){
    this._classServices.getSubGroup().subscribe((data:SubjectGroup[]) => {
      this.subGroupData=data; 
    })
  }
  ngOnInit() {  
    this.createRegisterClass();
    this.getAllClass();
    this.loadAllSubject();
    this.loadSubjectGroupList();
  }
  getAllClass() { 
    this._classLevel.getClasses().subscribe((data) => {
      this.allClasses = data;
    })
  }
   loadAllSubject(){
     this._subjectServices.getSubject().subscribe((data:Subject[])=>{
       this.allSubject=data;
      
       this.allSubject.forEach(element => {
         element.isChecked=false;
       });
       this.subject.push(this.allSubject);
     })
   }
   loadSection(classes:string){
     this.sections=[];
    this._classLevel.getSection(classes).subscribe((data:Section) => {
      this.allSec = data;
      this.sections=this.allSec.sections.split(",");
    })
   }
  onOptionsSelected(event) {
    this.selectedLevel = event.target.value;  
    this.registerClass.controls['classes'].setValue(this.selectedLevel);
  this.loadSection(this.selectedLevel);
  }
  AddSubjectGroup(){
    this.btnLoader = true; 
    if (this.registerClass.valid) { 
      this.subjectGrp = Object.assign({}, this.registerClass.value);  
      if (this.Id == 0) {
        this._classServices.PostSubjectGroup(this.subjectGrp).subscribe(() => {
          this.toastr.success('Subject Group Added!', 'Data Saved'); 
         this.Reset();
        }, error => {
          this.toastr.error('Saving Subject Group Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
      }else{
        this._classServices.PostSubjectGroup(this.subjectGrp).subscribe(() => {
          this.toastr.success('Subject Group Updated!', 'Data Saved'); 
         this.Reset();
        }, error => {
          this.toastr.error('Updating Subject Group Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
      } 
    }
  }
  Edit(item: SubjectGroup) {
    this.editsubject = [];
    this.ediSections = [];
    this.allSubject.forEach(element1 => {
      element1.isChecked = false;
    });
    this.sub = [];
    this.sec = [];
    this.editsubjectGrp = item;
    this.selectedLevel=item.Classes;
    this.loadSection(this.editsubjectGrp.Classes);
    this.seccheck=true;
    this.editsubject = this.editsubjectGrp.Subject.split(",");
    this.editsubject.forEach(element => {
      this.allSubject.forEach(element1 => {
        if (element == element1.Subject) {
          element1.isChecked = true;
          this.sub.push(element1.Subject);
        }
      });
    });


    this.ediSections = this.editsubjectGrp.Section.split(",");
    this.sec.push(this.ediSections);
    this.registerClass.controls['Id'].setValue(this.editsubjectGrp.Id);
    this.registerClass.controls['SubjectName'].setValue(this.editsubjectGrp.SubjectName);
    this.registerClass.controls['section'].setValue(this.ediSections.toString());
    this.registerClass.controls['subject'].setValue(this.editsubject.toString());
    this.registerClass.controls['classes'].setValue(item.Classes);
    this.subjectGrp = Object.assign({}, this.registerClass.value);
    this.Id = item.Id;
  }
  Delete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#ff5858',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        this._classServices.DelSubGrp(id).subscribe(()=>{
          this.toastr.success('Done','Subject Group Deleted Successfully.');
          this.loadSubjectGroupList(); 
          this.Reset();
        })
      } else if (result.isDismissed) {
        return;
      }
    })
  }
  // Sections
  changeSelection($event) {  
    this.sec.push($event.target.value); 
    this.sec.sort(); 
    var current = null;
    var cnt = 0;
    for (var i = 0; i <=this.sec.length; i++) {
        if (this.sec[i] != current) {
          this.registerClass.controls['section'].setValue(this.sec.toString());
            if (cnt > 0) {
              if(cnt==2){
                let index=this.sec.indexOf(current);
                this.sec.splice(index,2); 
                this.registerClass.controls['section'].setValue(this.sec.toString());
              } 
             }
            current = this.sec[i];
            cnt = 1;
            this.registerClass.controls['section'].setValue(this.sec.toString());
        } else {
            cnt++;
        }
    }
  } 
  //Subject
  changeSelectionSub($event){
    this.sub.push($event.target.value);
    this.sub.sort(); 
    var current = null;
    var cnt = 0;
    for (var i = 0; i <= this.sub.length; i++) {
      if (this.sub[i] != current) {
        this.registerClass.controls['subject'].setValue(this.sub.toString());
        if (cnt > 0) {
          if (cnt == 2) {
            let index = this.sub.indexOf(current);
            this.sub.splice(index, 2);
            this.registerClass.controls['subject'].setValue(this.sub.toString());
          }
        }
        current = this.sub[i];
        cnt = 1;
        this.registerClass.controls['subject'].setValue(this.sub.toString());
      } else {
        cnt++;
      }
    }
  } 

  Reset() {
    this.sub=[];
    this.sec=[];
    this.registerClass.reset();
    this.createRegisterClass();
    this.loadAllSubject();
    this.loadSubjectGroupList();
    this.loadSection(this.selectedLevel);
    this.seccheck=false;
    this.registerClass.controls['classes'].setValue(this.selectedLevel);
    this.btnLoader = false;
  }
}
