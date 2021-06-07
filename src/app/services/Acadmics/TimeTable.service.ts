import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TimeTable } from 'src/app/Models/TimeTable';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  baseURL = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  getTimetbl(classes, sec,weekday) {
    return this._http.get(this.baseURL + 'TimeTable' + '/' + classes + '/' + sec+'/'+weekday);
  }
  getTimetblForStudent(classes, sec) {
    return this._http.get(this.baseURL + 'TimeTable' + '/' + classes + '/' + sec);
  }

  PostTimeTable(table: TimeTable[]) {
    return this._http.post(this.baseURL + 'TimeTable' + '/register', table);
  }
  updateTT(tt: TimeTable[]) {
    return this._http.put(this.baseURL + 'TimeTable', tt);
  }
  DelTimetable(id: number) {
    return this._http.delete(this.baseURL + 'TimeTable' + '/' + id);
  }
}
