import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { SubjectService } from 'src/app/services/Acadmics/Subject.service';
import { Subject } from 'src/app/Models/Subject';
import { EmployeeService } from 'src/app/services/Employee.service';
import { EmpRegister } from 'src/app/Models/EmpRegister';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { Class } from 'src/app/Models/Class';
import { TimeTable } from 'src/app/Models/TimeTable';
import { TimeTableService } from 'src/app/services/Acadmics/TimeTable.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-Add-ClassTimetable',
  templateUrl: './Add-ClassTimetable.component.html',
  styleUrls: ['./Add-ClassTimetable.component.css']
})
export class AddClassTimetableComponent implements OnInit {
  subjects: Subject[];
  emp: EmpRegister[];
  classLevels: any;
  allClasses: any;
  selected = true;
  selectedSubject=false;
  selectedLevel;
  selectedSec;
  allSec: Class;
  sections: string[];
  tttable:TimeTable[]; 
  tttableMon: TimeTable[]; 
  tt:TimeTable;
  isShow:boolean;
  ttMaster: Array<TimeTable>=[]; 
  MonForm: FormGroup;
  TueForm:FormGroup;
  WedForm: FormGroup;
  ThuForm: FormGroup;
  FriForm: FormGroup;
  SatForm: FormGroup;
  selectedWeekDay: string ='Monday';
  Id: number;
  public btnLoader: boolean;
  public btnLoader1: boolean;

  constructor(private _secServices: SubjectService, private fb: FormBuilder,
    private _ttServices: TimeTableService, private toastr: ToastrService,
    private _classLevel: ClasslevelService, private _empServices: EmployeeService) {
    this.FormInitilization();
  } 
  FormInitilization(){
    this.MonForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.TueForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.WedForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.ThuForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.FriForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.SatForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }
  ngOnInit() { 
    this.isShow=false;
    this.selectedSubject=false;
    this.loadAllSubject();
    this.loadAllTeacher();
  }
 
  LevelChange(event) {
    let Ids = event.target.value;
    this._classLevel.getClass(Ids).subscribe((data) => {
      this.allClasses = data;
    })
  }
  SelectWeekend($event){ 
    switch ($event.nextId) {
      case 'ngb-tab-0':
        this.selectedWeekDay = 'Monday'; 
        this.GetTimeTable();
        break;
      case 'ngb-tab-1':
        this.selectedWeekDay = 'Tuesday'; 
        this.GetTimeTable();
        break;
      case 'ngb-tab-2':
        this.selectedWeekDay = 'Wednesday'; 
        this.GetTimeTable();
        break;
      case 'ngb-tab-3':
        this.selectedWeekDay = 'Thrusday'; 
        this.GetTimeTable();
        break;
      case 'ngb-tab-4':
        this.selectedWeekDay = 'Friday';
        this.GetTimeTable();
        break;
      case 'ngb-tab-5':
        this.selectedWeekDay = 'Saturday';
        this.GetTimeTable();
        break;
    
      default:
        break;
    }
  }
  GetTimeTable(){ 
    this._ttServices.getTimetbl(this.selectedLevel,this.selectedSec,this.selectedWeekDay).subscribe((data: TimeTable[]) => {
      this.tttable = data; 
      if(this.tttable.length==0){
        this.isShow = false;
        this.toastr.info('No Data Avalable To Display');
      } 
        else{
        this.isShow = true;
        }
    });
  }
 
  onOptionsSelectedSec(event){
    this.selectedSec=event.target.value;
  }

  onOptionsSelected(event) {
    this.selectedLevel = event.target.value;  
    this._classLevel.getSection(this.selectedLevel).subscribe((data: Class) => {
      this.allSec = data;
      this.sections = this.allSec.sections.split(',');
    })
  }
  loadAllSubject() {
    this._secServices.getSubject().subscribe((data: Subject[]) => {
      this.subjects = data;
    });
  }

  loadAllTeacher() {
    this._empServices.getTeacher().subscribe((data: EmpRegister[]) => {
      this.emp = data;
      console.log(this.emp);
    });
  }
   
  quantities(): FormArray {
    return this.MonForm.get("quantities") as FormArray
  }
  quantities1(): FormArray {
    return this.TueForm.get("quantities") as FormArray
  }
  quantities2(): FormArray {
    return this.WedForm.get("quantities") as FormArray
  }
  quantities3(): FormArray {
    return this.ThuForm.get("quantities") as FormArray
  }
  quantities4(): FormArray {
    return this.FriForm.get("quantities") as FormArray
  }
  quantities5(): FormArray {
    return this.SatForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      Classes: [this.selectedLevel, Validators.required],
      Sec: [this.selectedSec, Validators.required],
      subjectsId: ['', Validators.required],
      teachersId: ['', Validators.required],
      timefrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      RoomNo: ['', Validators.required],
      WeekDay: this.selectedWeekDay
    })
  }
  
  onSubmit() {
    this.tttableMon = this.MonForm.value.quantities;
    this.btnLoader1 = true;
    this._ttServices.PostTimeTable(this.tttableMon).subscribe(() => {
      this.toastr.success('Time Table Saved!', 'Data Saved');
      this.btnLoader1 = false;
    }, error => {
      this.toastr.error('Time Table Saving Failed!', 'Problem in saving Data', error);
      this.btnLoader1 = false;
    });
  }
  onSubmit1() {
    this.tttableMon = this.TueForm.value.quantities;
    this.btnLoader1 = true;
    this._ttServices.PostTimeTable(this.tttableMon).subscribe(() => {
      this.toastr.success('Time Table Saved!', 'Data Saved');
      this.btnLoader1 = false;
    }, error => {
      this.toastr.error('Time Table Saving Failed!', 'Problem in saving Data', error);
      this.btnLoader1 = false;
    });
  }
  onSubmit2() {
    this.tttableMon = this.WedForm.value.quantities;
    this.btnLoader1 = true;
    this._ttServices.PostTimeTable(this.tttableMon).subscribe(() => {
      this.toastr.success('Time Table Saved!', 'Data Saved');
      this.btnLoader1 = false;
    }, error => {
      this.toastr.error('Time Table Saving Failed!', 'Problem in saving Data', error);
      this.btnLoader1 = false;
    });
  }
  onSubmit3() {
    this.tttableMon = this.ThuForm.value.quantities;
    this.btnLoader1 = true;
    this._ttServices.PostTimeTable(this.tttableMon).subscribe(() => {
      this.toastr.success('Time Table Saved!', 'Data Saved');
      this.btnLoader1 = false;
    }, error => {
      this.toastr.error('Time Table Saving Failed!', 'Problem in saving Data', error);
      this.btnLoader1 = false;
    });
  }
  onSubmit4() {
    this.tttableMon = this.FriForm.value.quantities;
    this.btnLoader1 = true;
    this._ttServices.PostTimeTable(this.tttableMon).subscribe(() => {
      this.toastr.success('Time Table Saved!', 'Data Saved');
      this.btnLoader1 = false;
    }, error => {
      this.toastr.error('Time Table Saving Failed!', 'Problem in saving Data', error);
      this.btnLoader1 = false;
    });
  }
  onSubmit5() {
    this.tttableMon = this.SatForm.value.quantities;
    this.btnLoader1 = true;
    this._ttServices.PostTimeTable(this.tttableMon).subscribe(() => {
      this.toastr.success('Time Table Saved!', 'Data Saved');
      this.btnLoader1 = false;
    }, error => {
      this.toastr.error('Time Table Saving Failed!', 'Problem in saving Data', error);
      this.btnLoader1 = false;
    });
  }
  DeleteSTT(id: number) {
    var isConfirm = confirm("Are You Sure!");
    if (isConfirm == true) {
      this._ttServices.DelTimetable(id).subscribe(() => {
        this.toastr.success("Section Deleted Successfully");
        this.GetTimeTable();
      })
    } else {
    }

  }
  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  removeQuantity1(i: number) {
    this.quantities1().removeAt(i);
  }
  removeQuantity2(i: number) {
    this.quantities2().removeAt(i);
  }
  removeQuantity3(i: number) {
    this.quantities3().removeAt(i);
  }
  removeQuantity4(i: number) {
    this.quantities4().removeAt(i);
  }
  removeQuantity5(i: number) {
    this.quantities5().removeAt(i);
  } 
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
  addQuantity1() {
    this.quantities1().push(this.newQuantity());
  }
  addQuantity2() {
    this.quantities2().push(this.newQuantity());
  }
  addQuantity3() {
    this.quantities3().push(this.newQuantity());
  }
  addQuantity4() {
    this.quantities4().push(this.newQuantity());
  }
  addQuantity5() {
    this.quantities5().push(this.newQuantity());
  }

  AddRow() {
    if(this.selectedSec==undefined){
      this.toastr.info('Please select Class and section');
      return;
    }
    this.addQuantity();
  }
  AddRow1() {
    if (this.selectedSec == undefined) {
      this.toastr.info('Please select Class and section');
      return;
    }
    this.addQuantity1();
  }
  AddRow2() {
    if (this.selectedSec == undefined) {
      this.toastr.info('Please select Class and section');
      return;
    }
    this.addQuantity2();
  }
  AddRow3() {
    if (this.selectedSec == undefined) {
      this.toastr.info('Please select Class and section');
      return;
    }
    this.addQuantity3();
  }
  AddRow4() {
    if (this.selectedSec == undefined) {
      this.toastr.info('Please select Class and section');
      return;
    }
    this.addQuantity4();
  }
  AddRow5() {
    if (this.selectedSec == undefined) {
      this.toastr.info('Please select Class and section');
      return;
    }
    this.addQuantity5();
  }

  SaveTTMon(form) {
    if (this.selectedLevel == null)
      return alert("Select Appropriate Classe");

    if (this.selectedSec == null)
      return alert("Select Appropriate Section");

    this.btnLoader = true;
      this._ttServices.updateTT(form).subscribe(() => {
          this.toastr.success('Time Table Updated!', 'Data Saved');
        this.btnLoader = false;
        }, error => { 
          this.toastr.error('Time Table Class Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        });
    } 
}
