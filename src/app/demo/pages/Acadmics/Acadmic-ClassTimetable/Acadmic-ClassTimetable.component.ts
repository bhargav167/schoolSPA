import { Component, OnInit } from '@angular/core';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { Class } from 'src/app/Models/Class';

@Component({
  selector: 'app-Acadmic-ClassTimetable',
  templateUrl: './Acadmic-ClassTimetable.component.html',
  styleUrls: ['./Acadmic-ClassTimetable.component.css']
})
export class AcadmicClassTimetableComponent implements OnInit {
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel;
  allSec:Class;
  sections:string[];
  constructor(private _classLevel:ClasslevelService) { }

  ngOnInit() {
  }

  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  }
  onOptionsSelected(event){
    this.selectedLevel=event.target.value;  
    let classes = event.target.value;
    this._classLevel.getSection(classes).subscribe((data:Class) => {
      this.allSec = data; 
    })
   }  
}
