import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-basic-admission',
  templateUrl: './basic-admission.component.html',
  styleUrls: ['./basic-admission.component.css']
})
export class BasicAdmissionComponent implements OnInit {
  public meetingconfig:any;
  public signature:any;
 
  constructor() {
    document.getElementById('zmmtg-root').style.display='block';
    this.setCongf(9813229101);
  }
  setCongf(val) {
    this.meetingconfig = {
    apiKey: 'UpuWriWjT-e9EgaJ7LMx6Q',
    apiSecret: 'xV9PJq61c8tlVXFtp3YkpynzXYpzmdBQOIhL',
    meetingNumber:val,
    userName: 'bhargavajax@gmail.com',
    passWord: "V1JxU0FwbXByM0U3SkR0cE1qdDdoUT09",
    leaveUrl: "http://localhost:4200",
    role: 1
    };
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetingconfig.meetingNumber,
      apiKey: this.meetingconfig.apiKey,
      apiSecret: this.meetingconfig.apiSecret,
      role: this.meetingconfig.role,
      success: function (res) {
        console.log(res.result);
      }
    })
     
  }
  
  ngOnInit() {
      ZoomMtg.init({
        leaveUrl: 'http://localhost:4200',
        isSupportAV: true,
        success: (res) => {
          ZoomMtg.join({
            meetingNumber: this.meetingconfig.meetingNumber,
            userName: this.meetingconfig.userName,
            signature: this.signature,
            apiKey: this.meetingconfig.apiKey,
            userEmail: 'bhargavajax@gmail.com',
            passWord: this.meetingconfig.passWord,
            success: (res) => {
              console.log('join meeting success');
            },
            error: (res) => {
              console.log(res);
            }
          });
        },
        error: (res) => {
          console.log(res);
        }
      });
    }
  }