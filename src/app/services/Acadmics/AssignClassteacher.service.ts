import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClassTeacher } from 'src/app/Models/ClassTeacher';

@Injectable({
    providedIn: 'root'
})
export class AssignClassteacherService {
    baseURL = environment.apiUrl;
    constructor(private _http: HttpClient) { }

    PostClassTeacher(classesteacher: ClassTeacher) {
        return this._http.post(this.baseURL + 'AssignClassTeacher' + '/register', classesteacher);
    }
    getClassTeacher(sessionId: number) {
        return this._http.get(this.baseURL + 'AssignClassTeacher/AllClassTeacher/' + sessionId);
    }
    deleteClassTeacher(id: number) {
        return this._http.delete(this.baseURL + 'AssignClassTeacher/'+id,{});
    }
}