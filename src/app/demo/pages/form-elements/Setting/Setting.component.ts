import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/AdminServices/Dashboard.service';
import { Session } from 'src/app/Models/Session';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/AdminServices/Session.service';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-Setting',
  templateUrl: './Setting.component.html',
  styleUrls: ['./Setting.component.css']
})
export class SettingComponent implements OnInit {
  session: Session;
  public btnLoader: boolean;
  registerSession: FormGroup;
  Id: number;
  constructor(private fb:FormBuilder,
    private _dashServices:DashboardService,
    private _sessionService:SessionService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.btnLoader = false;
    this.createRegisterSession();
   this.loadAllSession();
  }

  createRegisterSession(){
    this.registerSession=this.fb.group({
      Session:['',[Validators.required,Validators.maxLength(7),Validators.minLength(7)]]
    })
  } 

  AddSession(){
    this.btnLoader = true;  
    if (this.registerSession.valid) { 
      this.session = Object.assign({}, this.registerSession.value); 
      if (this.Id==null) {
        this.session.Id=0;
        this._sessionService.PostSession(this.session).subscribe(() => {
          this.toastr.success('Session Added!', 'Data Saved');
          this.registerSession.reset(); 
          this.createRegisterSession();
          this.btnLoader = false; 
          this.loadAllSession();
        }, error => {  
          this.toastr.error('Saving Session Failed!', 'Problem in saving Data',error);
          this.btnLoader = false;
        });
      }else{  
        this._sessionService.updateSession(this.Id,this.session).subscribe(() => { 
          this.toastr.success('Session Updated!', 'Data Saved');
          this.registerSession.reset(); 
          this.createRegisterSession();
          this.btnLoader = false; 
          this.loadAllSession();
          this.Id=null;
        }, error => {  
          this.toastr.error('Update Session Failed!', 'Problem in saving Data',error);
          this.btnLoader = false;
        });
      }
     
    }
  }

  Edit(item:Session) { 
    this._sessionService.getSessionById(item.Id).subscribe((data:Session)=>{
      this.registerSession.controls['Session'].setValue(data.Session);
      this.Id=data.Id;
    })
  }

  
  DeleteSession(item:Session) {
    var isConfirm=  confirm("Are You Sure!");
    if(isConfirm==true){
      this._sessionService.DelSession(item.Id).subscribe(()=>{
        this.toastr.success("Session Deleted Successfully");
        this.loadAllSession();
        this.Id=null
      })
    }else{
      this.Id=null;
    }
   
  }
  ActivateSession($event) {
    this._dashServices.ActivateSession($event).subscribe(() => {
     
    }, err => {
      console.log(err);
    })
  }
  
  loadAllSession() {
    this._dashServices.getSession().subscribe((data: Session) => {
      this.session = data;
    });
  }
}
