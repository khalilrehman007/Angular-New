import { Component, DoCheck, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from '@angular/common';
import { AppService } from 'src/app/service/app.service';

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

  constructor(private service: AuthService, private route: Router, private notifyService: NotificationService, private _location: Location, private api: AppService) {
  }
  Login = new FormGroup({
    Email: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  });
  get validate() {
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
      let data: any = {};
      data.DeviceId = localStorage.getItem("deviceToken");
      data.Email = this.Login.value.Email;
      data.Password = this.Login.value.Password;
      this.service.ProceedLogin(data).subscribe(result => {
        if (result != null) {
          this.responsedata = result
          if (this.responsedata.data !== null) {
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(this.responsedata.data.refreshToken))
            localStorage.setItem('user', JSON.stringify(this.responsedata.data))
            this.notifyService.showSuccess(this.responsedata.message, "");
            this._location.back();
          } else {
            if (this.responsedata.error.length > 0) {
              this.notifyService.showError(this.responsedata.error[0], "");
            }
            this.notifyService.showError(this.responsedata.message, "");
          }
        } else {
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
        let temp: any = "";
        if (localStorage.getItem("deviceToken")) {
          temp = localStorage.getItem("deviceToken");
        }
        this.api.Googlelogin({ "Provider": "google", "IdToken": googleAuthUser.getAuthResponse().id_token, "DeviceId": temp }).subscribe((result: any) => {
          if (result.message == "You are successfully logged in") {
            localStorage.setItem('token', JSON.stringify(result.data.refreshToken))
            localStorage.setItem('user', JSON.stringify(result.data))
            this.notifyService.showSuccess(result.message, result.message);
            this._location.back();
          }
        })
      }, (error: any) => {
      });

  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '406110889808-nqqu9i00qptmjfi96ore1ee7qo6266jj.apps.googleusercontent.com',
          plugin_name: 'login',
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