import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthRegister } from 'src/app/Models/AuthRegister';
import { AuthService } from 'src/app/services/AuthServices/Auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  public btnLoader: boolean;
  formModel:FormGroup;
  authRegister:AuthRegister;
  role:string='Admin';
  constructor(private fb:FormBuilder,private _authServices:AuthService,private toastr: ToastrService) { }

  createPost(){
    this.formModel =this.fb.group({
      UserName:['',Validators.required],
      Email:['',Validators.required],
      FullName:['',Validators.required],
      Password:['',Validators.required],
      ConfirmPassword:['',Validators.required] 
    }) 
  }

  ngOnInit() {
    this.createPost();
  }

  register() {
    this.btnLoader = true;  
     if (this.formModel.valid) {
      this.authRegister = Object.assign({}, this.formModel.value);  
      this._authServices.register(this.authRegister,this.role).subscribe(() => {
        this.toastr.success('Registration Done!', 'Data Saved');
        this.formModel.reset();
        this.btnLoader = false;
        this.createPost();
      }, error => {
        this.toastr.error('Registration Failed!', 'Problem in saving Data',error);
        this.btnLoader = false;
      },()=>{ 
      });
    }
  }

}
