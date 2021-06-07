import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthServices/Auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
 selectedRole:string='Role';
 imgURL: any;
 isRoleSelected:boolean=false;
 public btnLoader: boolean;
  formModel: any = {
    UserName: '',
    Password: ''
  } 
  constructor(private _authServices:AuthService,
    private _http:HttpClient,
    private _router:Router,private toastr: ToastrService) {localStorage.clear(); }

  ngOnInit() {
    this.btnLoader = false;
    if (localStorage.getItem('token') != null)
      this._router.navigateByUrl('/layout/fixed');
  } 
  login(form: NgForm) {
    this.btnLoader = true;
    this._authServices.login(form.value, this.selectedRole).subscribe((res: any) => { 
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.selectedRole);
      localStorage.setItem("Id", res.Id);

      if (this.selectedRole == 'Admin') {
       
        this._router.navigateByUrl('/layout/fixed');
      }
      if (this.selectedRole == 'Student') {
       
        this.loadProfileImg(res.Id);
        this._router.navigateByUrl('/layout/StuDash');
      } 
    },
     err => { 
       if(err.status==400){
         this.toastr.error("Opps! Incorrect UserName & Password");
         this.btnLoader = false;
       }
       if(err.status==401){
        this.toastr.error("Opps! You Are Not Authorized For This Role.");
        this.btnLoader = false;
      }
     })
  }

  GetSelectedRole(role: string) { 
   this.selectedRole='';
   this.selectedRole=role; 
   this.isRoleSelected=true;
  }
  loadProfileImg(id){  
    this._http.get(environment.apiUrl + `UserProfile/ProStuImg/${id}`)
      .subscribe((data:any) => { 
        data != null ? this.imgURL = data.Imgurl : this.imgURL='../../../../../assets/images/user/student.png';
        localStorage.setItem("imgurl",this.imgURL);
      });
  }
  
}