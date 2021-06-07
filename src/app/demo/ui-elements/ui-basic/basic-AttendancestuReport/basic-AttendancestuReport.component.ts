import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/Models/Attendance';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { FeeParticular } from 'src/app/Models/FeeParticular'; 
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { EventSettingsModel, View, EventRenderedArgs } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { Class } from 'src/app/Models/Class';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basic-AttendancestuReport',
  templateUrl: './basic-AttendancestuReport.component.html',
  styleUrls: ['./basic-AttendancestuReport.component.css']
})
export class BasicAttendancestuReportComponent implements OnInit {
  public btnLoader: boolean; 
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel; 
  stuIdSelected;
  allStudentOfClass:any;
  showData:boolean;
  FeeTypes:FeeParticular[];
  disable;
  sec:string;
  allSec:Class;
  sections:string[];
  attendance:Attendance[]; 
  public readonly: boolean = true; 
  public selectedDate: Date = new Date(2020, 12, 12);
  public currentView: View = 'Month';
   public dataManger: DataManager = new DataManager();
  public eventSettings: EventSettingsModel;
   
  constructor(private _classLevel:ClasslevelService,
    private _feeService: FeeModulesService) { }

  ngOnInit() {  
  }

  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  }
  
 

   onOptionsSelectedStudents(event){
    this.stuIdSelected=event.target.value; 
   } 
   getStuByClassSelect(event){
     this.sec=event.target.value;
    this._feeService.getStuByClass(this.selectedLevel,event.target.value).subscribe((data:Response)=>{
      this.allStudentOfClass=data;
    })
  } 
  onOptionsSelected(event){
    this.selectedLevel=event.target.value;  
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data;
     this.sections= this.allSec.sections.split(',');
      
    })
   }

//Display Attendance On Calender
  getstuAttendance() {
    this.dataManger = new DataManager({
      url:environment.apiUrl+'Attendance/StuAttendance/' + this.selectedLevel + '/' + this.sec + '/' + this.stuIdSelected + '?StartDate=null&EndDate=null',
      adaptor: new WebApiAdaptor,
      crossDomain: true
    });
    this.eventSettings = { dataSource: this.dataManger };
    this.showData = true;
  }
  
  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.backgroundColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
      args.element.style.height = '50px';
      args.element.style.textAlign = 'center';
      args.element.style.fontSize = 'bold';
    }
  }

}
