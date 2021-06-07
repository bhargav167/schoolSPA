import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/AuthServices/Auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-AdminProfile',
  templateUrl: './AdminProfile.component.html',
  styleUrls: ['./AdminProfile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  @Output()
  preiviewImg = new EventEmitter<string>();
  userData:any;
  public imagePath;
  imgURL: any;
  public btnLoader: boolean;
  disabled:boolean=true;
  constructor(private _auth:AuthService,
    private http:HttpClient, 
    private _tost:ToastrService) { }
  ngOnInit() {
    this.loadAdminProfile();
  }
  loadAdminProfile() {
    this._auth.GetUserProfile().subscribe((data) => {
      this.userData = data;
      this.loadProfileImg();
    })
  }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this._tost.warning('Opps!', "Only images are supported.");
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.preiviewImg.emit(this.imgURL);
      if(this.imgURL!=null)
      this.disabled=false;
    }
  }
  public uploadFile = (files) => { 
    if (files.length === 0) {
      return;
    }
 this.btnLoader=true;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(environment.apiUrl+ `Admin/${this.userData.Id}/Upload`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.btnLoader = true;
        }
        else if (event.type === HttpEventType.Response) {
          this.btnLoader=false;
          this.disabled=true; 
        }
      });
  } 

  loadProfileImg(){ 
    this.http.get(environment.apiUrl + `UserProfile/ProImg/${this.userData.Id}`)
      .subscribe((data:any) => {
        data != null ? this.imgURL = data.imgUrl : this.imgURL='./../../../../../assets/images/user/Admin.png';
      });
  }
}