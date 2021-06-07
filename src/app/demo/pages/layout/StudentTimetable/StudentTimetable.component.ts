import { Component, OnInit } from '@angular/core';
import { StudentTimeTable } from 'src/app/Models/Student/StudentTimeTable';
import { TimeTableService } from 'src/app/services/Acadmics/TimeTable.service';

@Component({
  selector: 'app-StudentTimetable',
  templateUrl: './StudentTimetable.component.html',
  styleUrls: ['./StudentTimetable.component.css']
})
export class StudentTimetableComponent implements OnInit {
  timetablModel: StudentTimeTable[];
  monTimeTbl: StudentTimeTable[] = [];
  tueTimeTbl: StudentTimeTable[] = [];
  wedTimeTbl: StudentTimeTable[] = [];
  thuTimeTbl: StudentTimeTable[] = [];
  friTimeTbl: StudentTimeTable[] = [];
  satTimeTbl: StudentTimeTable[] = [];

  standers:string;
  section:string;
  constructor(private classtimetblServices: TimeTableService) { }
  ngOnInit() {
    this.standers=localStorage.getItem("stander");
    this.section=localStorage.getItem("section");
    this.loadTimeTable();
  }
  loadTimeTable() {
    this.classtimetblServices.getTimetblForStudent(this.standers, this.section).subscribe((data: StudentTimeTable[])=>{
      this.timetablModel=data;
      this.timetablModel.forEach(element => {
        switch (element.WeekDay) {
          case 'Monday':
            this.monTimeTbl.push(element);
            console.log(this.monTimeTbl);
            break;
          case 'Tuesday':
            this.tueTimeTbl.push(element);
            break;
          case 'Wednesday':
            this.wedTimeTbl.push(element);
            break;
          case 'Thrusday':
            this.thuTimeTbl.push(element);
            break;
          case 'Friday':
            this.friTimeTbl.push(element);
            break;
          case 'Saturday':
            this.satTimeTbl.push(element);
            break;
        
          default:
            break;
        } 
      });
    })
  }
}
