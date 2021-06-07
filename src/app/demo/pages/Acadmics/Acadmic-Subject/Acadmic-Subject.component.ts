import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/Models/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/services/Acadmics/Subject.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Acadmic-Subject',
  templateUrl: './Acadmic-Subject.component.html',
  styleUrls: ['./Acadmic-Subject.component.css']
})
export class AcadmicSubjectComponent implements OnInit {
  subject: Subject;
  subjects: Subject[];
  Id: number;
  public btnLoader: boolean;
  registerSubject:FormGroup;
  constructor(private fb:FormBuilder,
    private _secServices:SubjectService, 
    private toastr: ToastrService) { } 

  ngOnInit() {
    this.createRegisterSubject();
    this.loadAllSubject();
  }

  createRegisterSubject() {
    this.registerSubject = this.fb.group({
      Subject: ['', [Validators.required]],
      codeId: ['', [Validators.required]],
      Types: ['Practicle', [Validators.required]]
    })
  }
  Edit(item:Subject) { 
    this._secServices.getSubjectById(item.Id).subscribe((data: Subject) => {
      this.registerSubject.controls['Subject'].setValue(data.Subject);
      this.registerSubject.controls['codeId'].setValue(data.codeId);
      this.registerSubject.controls['Types'].setValue(data.Types);
      this.Id = data.Id;
    })
  }
  loadAllSubject() {
    this._secServices.getSubject().subscribe((data: Subject[]) => {
      this.subjects = data; 
    });
  }

  DeleteSubject(item:Subject) {
    var isConfirm=  confirm("Are You Sure!");
    if(isConfirm==true){
      this._secServices.DelSubject(item.Id).subscribe(()=>{
        this.toastr.success("Section Deleted Successfully");
      this.loadAllSubject();
        this.Id=null
      })
    }else{
      this.Id=null;
    }
   
  }

  AddSubject() {
    this.btnLoader = true;
    if (this.registerSubject.valid) {
      this.subject = Object.assign({}, this.registerSubject.value);
      if (this.Id == null) {
        this.subject.Id = 0;
        this._secServices.PostSubject(this.subject).subscribe(() => {
          this.toastr.success('Subject Added!', 'Data Saved');
          this.registerSubject.reset();
          this.createRegisterSubject();
          this.btnLoader = false;
          this.loadAllSubject();
        }, error => {
          this.toastr.error('Saving subject Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
      } else {
        this._secServices.updateSubject(this.Id, this.subject).subscribe(() => {
          this.toastr.success('Subject Updated!', 'Data Saved');
          this.registerSubject.reset();
          this.createRegisterSubject();
          this.btnLoader = false;
          this.loadAllSubject();
          this.Id = null;
        }, error => {
          this.toastr.error('Update Subject Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
      }
    }
  }

}