import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-stu-View',
  templateUrl: './basic-stu-View.component.html',
  styleUrls: ['./basic-stu-View.component.css']
})
export class BasicStuViewComponent implements OnInit {
  students:QuickAdmission; 
  imgURL: string='../../../../../assets/images/user/student.png';
  constructor(private _route:ActivatedRoute,
    private _http:HttpClient,
    private _tost:ToastrService,
    private _classLevel:ClasslevelService){ }

    ngOnInit() {  
      this._classLevel.getQuickStudent(this._route.snapshot.params['UserId']).subscribe((user: QuickAdmission) => {
        this.students = user; 
        this.loadProfileImg();
      }, error => {
        this._tost.error('Error','Problem in loading Profile details.',error);
      })
    }
    loadProfileImg(){  
      this._http.get(environment.apiUrl + `UserProfile/ProStuImg/${this._route.snapshot.params['UserId']}`)
        .subscribe((data:any) => { 
          data != null ? this.imgURL = data.Imgurl : this.imgURL='../../../../../assets/images/user/student.png'; 
        },error=>{
          this._tost.error('Error','Problem in loading Profile Images.',error);
        });
    }
}
