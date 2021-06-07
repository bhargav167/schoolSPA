import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Class } from 'src/app/Models/Class';
import { ClassTeacher } from 'src/app/Models/ClassTeacher';
import { EmpRegister } from 'src/app/Models/EmpRegister';
import { AssignClassteacherService } from 'src/app/services/Acadmics/AssignClassteacher.service';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { EmployeeService } from 'src/app/services/Employee.service';

@Component({
  selector: 'app-AssignClassTeacher',
  templateUrl: './AssignClassTeacher.component.html',
  styleUrls: ['./AssignClassTeacher.component.scss']
})
export class AssignClassTeacherComponent implements OnInit {
  classLevels: any;
  allClasses: any;
  selected = true;
  selectedLevel;
  allSec: Class;
  sections: string[];
  selectedSection:string;
  emp: EmpRegister[];
  classTeacherModel:ClassTeacher;
  classTeacher: ClassTeacher[];
  saveForm: FormGroup;
  teacherName:string;
  sessionId:any;
  constructor(private _classLevel: ClasslevelService, 
    private fb: FormBuilder,
    private classteacherServices: AssignClassteacherService,
    private toastr: ToastrService,
    private _empServices: EmployeeService) { this.sessionId = localStorage.getItem("sessionId")}

  ngOnInit() {
    this.loadAllTeacher();
    this.createRegisterForm();
    this.loadClassTeacher();
  }
  
  createRegisterForm() {
    this.saveForm = this.fb.group({
      classe: ['', Validators.required],
      Section: ['', Validators.required],
      TeacherName: ['', Validators.required],
      TeacherId: ['', Validators.required],
      sessionId: [this.sessionId]
    })
  }
  AssignTeacher(firstName,lastName) {
    this.teacherName=firstName+' '+lastName;
    this.saveForm.get('TeacherName').setValue(this.teacherName);
  }
  loadAllTeacher() {
    this._empServices.getTeacher().subscribe((data: EmpRegister[]) => {
      this.emp = data;
    });
  }
  loadClassTeacher(){
    this.classteacherServices.getClassTeacher(this.sessionId).subscribe((data:ClassTeacher[])=>{
      this.classTeacher=data;
    })
  }
  LevelChange(event) {
    let Ids = event.target.value;
    this._classLevel.getClass(Ids).subscribe((data) => {
      this.allClasses = data;
    })
  }
  onOptionsSelected(event) {
    this.selectedLevel = event.target.value;
    this.saveForm.get('classe').setValue(this.selectedLevel);
    this._classLevel.getSection(this.selectedLevel).subscribe((data: Class) => {
      this.allSec = data;
      this.sections = this.allSec.sections.split(',');
    })
  }
  selectedSec($event) {
    this.selectedSection = $event.target.value;
  }
  SaveChange(){
     this.classTeacherModel = this.saveForm.value;
    this.classteacherServices.PostClassTeacher(this.classTeacherModel).subscribe(()=>{
      this.toastr.success('Class Teacher Assigned');
      this.loadClassTeacher();
    },err=>{
      this.toastr.error('Opps! Data already exist');
    })
  }
  deleteClassTeacher(id){
    this.classteacherServices.deleteClassTeacher(id).subscribe(()=>{
      this.toastr.success('Record deleted successfully');
      this.loadClassTeacher();
    })
  }
}
