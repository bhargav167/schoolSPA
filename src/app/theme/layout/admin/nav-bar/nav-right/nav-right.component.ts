import {Component, DoCheck, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {GradientConfig} from '../../../../../app-config';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthServices/Auth.service';
import { DashboardService } from 'src/app/services/AdminServices/Dashboard.service'; 
import { Session } from 'src/app/Models/Session';
import { CommonContentComponent } from 'src/app/demo/pages/layout/common-content/common-content.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})

export class NavRightComponent implements OnInit, DoCheck  {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public gradientConfig: any;
  role:string;
  AllSession:Session[];
  selectedSession: string;
  userDetails;
  imgURL: any;
  constructor(private _router: Router, private _auth: AuthService, 
    private http:HttpClient, 
    private dashService: DashboardService) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.gradientConfig = GradientConfig.config;
  }
 
  ngOnInit() {
  this.role =  localStorage.getItem('role');

  this.GetSession();
    if (!this.role) {
      this._router.navigateByUrl('/auth/signin')
    }
 
    this._auth.GetUserProfile().subscribe(
      res=>{
        this.userDetails=res; 
        if (this.role == 'Student') {
          this.imgURL = localStorage.getItem("imgurl");
        }else{
          this.loadProfileImg();
        }
      },
      err=>{
        console.log(err);
      }
    )
   }
  
  LoadSession($event) { 
   localStorage.setItem("sessionId",$event);
   location.reload();
  }

  GetSession() {
    if (localStorage.getItem("sessionId") == null) {
      this.dashService.getSession().subscribe((data: Session[]) => {
        this.AllSession = data;
        this.AllSession.forEach(element => {
          if (element.IsActive == true) {
            localStorage.setItem("sessionId", element.Id.toString());
            this.selectedSession = element.Session;
          }
        });
      })
    } else {
      this.dashService.getSession().subscribe((data: Session[]) => {
        this.AllSession = data;
        this.AllSession.forEach(element => {
          if (element.Id.toString() == localStorage.getItem("sessionId")) {
            this.selectedSession = element.Session;
          }
        });
      })
    }

  }
  onChatToggle(friendID) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  loadProfileImg(){ 
    this.http.get(environment.apiUrl + `UserProfile/ProImg/${this.userDetails.Id}`)
      .subscribe((data:any) => { 
        data != null ? this.imgURL = data.imgUrl : this.imgURL='../../../../../../assets/images/user/Admin.png';
      });
  }
  ngDoCheck() {
    if (document.querySelector('body').classList.contains('elite-rtl')) {
      this.gradientConfig['rtl-layout'] = true;
    } else {
      this.gradientConfig['rtl-layout'] = false;
    }
  }
  Logout(){
    localStorage.clear();
    this._router.navigateByUrl('/auth/signin');
  }
}
