import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/services/Acadmics/Section.service';
import { ToastrService } from 'ngx-toastr';
import { Section } from 'src/app/Models/Section';
import { Class } from 'src/app/Models/Class';
import { ClassesService } from 'src/app/services/Acadmics/Classes.service';

@Component({
  selector: 'app-Acadmic-Classes',
  templateUrl: './Acadmic-Classes.component.html',
  styleUrls: ['./Acadmic-Classes.component.css']
})
export class AcadmicClassesComponent implements OnInit {
sec:Section[];
classes:Class[];
class: Class; 
Id: number;
registerClass:FormGroup;
public btnLoader: boolean;
postSection:Section[]=[
  {
    Id: 1,
    section: 'A',
    isChecked: true
  },
];
selectedItemsList = [];
  checkedIDs = [];
  constructor(private fb:FormBuilder,
    private _secServices: SectionService,
    private _classServices: ClassesService,
    private toastr: ToastrService) { } 

  ngOnInit() { 
    this.createRegisterClass();
    this.loadSectionList();
    this.loadClassSection();
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
  }
  createRegisterClass() {
    this.registerClass = this.fb.group({
      classes: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1)]]
    }) 
  } 
  loadSectionList(){
    this._secServices.getSection().subscribe((data:Section[])=>{
      this.sec=data;  
    })
  }
  loadClassSection() {
    this._classServices.getClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }
  AddClass(){  
    this.btnLoader = true;  
    if (this.registerClass.valid) { 
      this.class = Object.assign({}, this.registerClass.value); 
      this.selectedItemsList.forEach(element => {
        this.class.sections+=element.section+','; 
      });
      let sec= this.class.sections.substring(9,this.class.sections.length-1).trim();
     this.class.sections=sec; 
      if (this.Id == null) {
        this.class.Id = 0;
        this._classServices.PostClass(this.class).subscribe(() => {
          this.toastr.success('Class Added!', 'Data Saved');
          this.registerClass.reset();
          this.createRegisterClass();
          this.btnLoader = false;
        this.loadClassSection();
        this.sec.forEach(element => {
          element.isChecked=false;
        });  
        }, error => {
          this.toastr.error('Saving Session Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
      } 
      else {
        this._classServices.updateClass(this.Id,this.class).subscribe(() => { 
          this.toastr.success('Section Updated!', 'Data Saved');
          this.registerClass.reset(); 
          this.createRegisterClass();
          this.btnLoader = false; 
          this.loadClassSection();
          this.Id=null;
          this.sec.forEach(element => {
            element.isChecked=false;
          });  
        }, error => {  
          this.toastr.error('Update Class Failed!', 'Problem in saving Data',error);
          this.btnLoader = false;
        });
      } 
    }
  }
  Edit(item:Class) {
   this.sec.forEach(element => {
     element.isChecked=false;
   });  
    this._classServices.getClassById(item.Id).subscribe((data:Class)=>{
      this.registerClass.controls['classes'].setValue(data.classes); 
     let s= data.sections.split(',');
     for (let index = 0; index < s.length; index++) {
     
       this.sec[index].isChecked=true;  
    }

      this.Id=data.Id;
    })
  }

  DeleteClass(item:Class) {
    var isConfirm=  confirm("Are You Sure!");
    if(isConfirm==true){
      this._classServices.DelClass(item.Id).subscribe(()=>{
        this.toastr.success("Section Deleted Successfully");
        this.loadClassSection();
        this.Id=null
      })
    }else{
      this.Id=null;
    }
   
  }


  changeSelection() {
    this.fetchSelectedItems();
  }
  fetchSelectedItems() {
    this.selectedItemsList = this.sec.filter((value, index) => {
      return value.isChecked
    });
  }
  fetchCheckedIDs() {
    this.checkedIDs = []
    this.sec.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.Id);
      }
    });
  }
}
