import { Component,DoCheck, ElementRef,ViewChild, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  goggle = '../../../../assets/images/btns/google-1.svg'
  apple = '../../../../assets/images/btns/apple-1.svg'
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  submitted = false;
  responsedata: any;
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService,private _location: Location) {
    localStorage.clear();
  }
  Login = new FormGroup({
    Email: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  });
  get validate(){
    return this.Login.controls;
  }

  public showPassword: boolean = false;
  ngOnInit(): void {
    this.googleAuthSDK();
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  ProceedLogin() {
    this.submitted = true;
    if (this.Login.invalid) {
      return;
    }
    if (this.Login.valid) {
      this.service.ProceedLogin(this.Login.value).subscribe(result => {
        if(result!=null ){
          this.responsedata = result
          if(this.responsedata.data !== null){
            // this.responsedata.data = this.responsedata.data;
            localStorage.setItem('token',JSON.stringify(this.responsedata.data.refreshToken))
            localStorage.setItem('user',JSON.stringify(this.responsedata.data))
            this.notifyService.showSuccess(this.responsedata.message, "");
            // this.route.navigate([''])
            this._location.back();
          }else{
            if(this.responsedata.error.length > 0){
              this.notifyService.showError(this.responsedata.error[0], "");
            }
            this.notifyService.showError(this.responsedata.message, "");
          }
        }else{
          this.notifyService.showError("Unable to signup", "");
        }
        // this.route.navigate([''])
      });
    }
  }
  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {
        console.log(googleAuthUser.getAuthResponse());
        //Print profile details in the console logs
        let profile = googleAuthUser.getBasicProfile();
        console.log('access_token || ' + googleAuthUser.getAuthResponse().access_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '420182016845-ai84cpb21nrb6t1tq8jm8jc98b2vp0o8.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}
