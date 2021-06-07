import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SectionService } from 'src/app/services/Acadmics/Section.service';
import { Section } from 'src/app/Models/Section';

@Component({
  selector: 'app-Acadmic-Section',
  templateUrl: './Acadmic-Section.component.html',
  styleUrls: ['./Acadmic-Section.component.css']
})
export class AcadmicSectionComponent implements OnInit {
  section: Section;
  Id: number;
  public btnLoader: boolean;
  registerSection:FormGroup;
  constructor(private fb:FormBuilder,
    private _secServices:SectionService, 
    private toastr: ToastrService) { } 

  ngOnInit() {
    this.createRegisterSection();
    this.loadAllSection();
  }
  createRegisterSection() {
    this.registerSection = this.fb.group({
      section: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]]
    })
  } 

  AddSection(){
    this.btnLoader = true;  
    if (this.registerSection.valid) { 
      this.section = Object.assign({}, this.registerSection.value); 
      if (this.Id == null) {
        this.section.Id = 0;
        this._secServices.PostSection(this.section).subscribe(() => {
          this.toastr.success('Section Added!', 'Data Saved');
          this.registerSection.reset();
          this.createRegisterSection();
          this.btnLoader = false;
         this.loadAllSection();
        }, error => {
          this.toastr.error('Saving Session Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
      } else {
        this._secServices.updateSection(this.Id,this.section).subscribe(() => { 
          this.toastr.success('Section Updated!', 'Data Saved');
          this.registerSection.reset(); 
          this.createRegisterSection();
          this.btnLoader = false; 
          this.loadAllSection();
          this.Id=null;
        }, error => {  
          this.toastr.error('Update Section Failed!', 'Problem in saving Data',error);
          this.btnLoader = false;
        });
      } 
    }
  }
  Edit(item:Section) { 
    this._secServices.getSectionById(item.Id).subscribe((data:Section)=>{
      this.registerSection.controls['section'].setValue(data.section);
      this.Id=data.Id;
    })
  }
  DeleteSection(item:Section) {
    var isConfirm=  confirm("Are You Sure!");
    if(isConfirm==true){
      this._secServices.DelSection(item.Id).subscribe(()=>{
        this.toastr.success("Section Deleted Successfully");
        this.loadAllSection();
        this.Id=null
      })
    }else{
      this.Id=null;
    }
   
  }
  loadAllSection() {
    this._secServices.getSection().subscribe((data: Section) => {
      this.section = data;
    });
  }
}
