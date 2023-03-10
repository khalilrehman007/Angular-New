import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { AppService } from 'src/app/service/app.service';
import { Location } from '@angular/common';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import * as i5 from "ngx-bootstrap/dropdown";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
  }
  countriesList = new FormControl('+971');
  goggle = '../../../../../assets/images/btns/google-1.svg'
  apple = '../../../../../assets/images/btns/apple-1.svg'
  info = '../../../../../assets/images/info.svg'
  responsedata: any;
  submitted = false;
  signUpPropertytype: any = [];
  professionalCheck: boolean = false;
  professionalTypeId: number = 0;
  auth2: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  countryData:any = "";
  seletedCountry:any = "";
  preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.SaudiArabia, CountryISO.Bahrain, CountryISO.Qatar, CountryISO.Oman, CountryISO.Kuwait];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });
  @ViewChild('signupRef', { static: true }) signupElement!: ElementRef;

  constructor(private service: AuthService, private route: Router, private notifyService: NotificationService, private _location: Location, private response: AppService, private cookie: CookieService) {
    localStorage.clear();
    this.response.ProfessionalTypes().subscribe((result: any) => {
      this.signUpPropertytype = result.data;
    })
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.seletedCountry = this.countryData.code;
        clearInterval(a);
      }
    }, 100);
  }
  signup = new FormGroup({
    FirstName: new FormControl("", Validators.required),
    LastName: new FormControl("", Validators.required),
    Email: new FormControl("", [Validators.required, Validators.email]),
    PhoneNumber: new FormControl("", Validators.required),
    Password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')])
  });
  get validate() {
    return this.signup.controls;
  }
  public showPassword: boolean = false;
  checkLength() {
    let temp: any = this.signup.value.PhoneNumber;
    if (temp.toString().length > 10) {
      this.error = "Max length allows is 10"
      this.signup.patchValue({
        PhoneNumber: temp.toString().slice(0, -1)
      })
    }
  }
  callLogin() {
    this.auth2.attachClickHandler(this.signupElement.nativeElement, {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();
        let temp: any = "";
        if (localStorage.getItem("deviceToken")) {
          temp = localStorage.getItem("deviceToken");
        }
        this.response.Googlelogin({ "Provider": "google", "IdToken": googleAuthUser.getAuthResponse().id_token, "DeviceId": temp }).subscribe((result: any) => {
          if (result.message == "You are successfully logged in") {
            localStorage.setItem('token', JSON.stringify(result.data.refreshToken))
            localStorage.setItem('user', JSON.stringify(result.data))
            this.notifyService.showSuccess(result.message, result.message);
            this.route.navigate([''])
          }
        })
      }, (error: any) => {
      });

  }
  ngOnInit() {
    this.googleAuthSDK();
    $(document).ready(function () {
      $('.dropdown-toggle').click(function () {
        $(this).next().toggleClass('active');
      });
    });
    $(document).ready(function () {
      $('.info-toogle').click(function () {
        $(this).parent().toggleClass('active');
      });
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
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleType(e: any) {
    this.professionalCheck = e.checked;
  }
  getProfessionalType(e: any) {
    this.professionalTypeId = e;
  }
  ProceedSignUp() {
    this.submitted = true;
    if (this.signup.value.FirstName == "") {
      this.error = "Please Enter First Name";
      this.showError = true;
      return;
    } else if (this.signup.value.LastName == "") {
      this.error = "Please Enter Last Name";
      this.showError = true;
      return;
    } else if (this.signup.value.Email == "") {
      this.error = "Please Enter Email";
      this.showError = true;
      return;
    } else if (this.signup.controls["Email"].invalid) {
      this.error = "Please Enter a valid Email";
      this.showError = true;
      return;
    } else if (this.signup.value.PhoneNumber == null) {
      this.error = "Please Enter Phone Number";
      this.showError = true;
      return;
    } else if (this.signup.value.Password == "") {
      this.error = "Please Enter Password";
      this.showError = true;
      return;
    } else if (this.signup.controls["Password"].invalid) {
      this.error = "Password does not meet the required pattern";
      this.showError = true;
      return;
    } else {
      let temp: any = {};
      temp.FirstName = this.signup.value.FirstName;
      temp.LastName = this.signup.value.LastName;
      temp.Email = this.signup.value.Email;
      let a: any = this.signup.value.PhoneNumber;
      temp.PhoneNumber = a.e164Number;
      temp.Password = this.signup.value.Password;
      temp.HasProfessionalType = this.professionalCheck;
      if (temp.HasProfessionalType == true) {
        if (this.professionalTypeId == 0) {
          this.error = "Select Professional Type";
          this.showError = true;
          return;
        } else {
          temp.ProfessionalTypeId = this.professionalTypeId;
        }
      }
      temp.DeviceId = "";
      if (localStorage.getItem("deviceToken")) {
        temp.DeviceId = localStorage.getItem("deviceToken");
      }
      this.response.DuplicateEmailPhoneNumber({ "Email": this.signup.value.Email, "PhoneNumber": a.e164Number }).subscribe((response: any) => {
        if (response.message == "Email and Password is  verfied successfully") {
          this.response.SendDigitSms({ "FirstName": this.signup.value.FirstName, "PhoneNumber": a.e164Number }).subscribe((result: any) => {
            if (result.message == "Phone Number is invalid") {
              this.error = "Invalid Phone Number";
              this.showError = true;
              return;
            }
            temp.code = result.data.randomDigit
            localStorage.setItem("signupData", JSON.stringify(temp));
            this.route.navigate(["/signup/otp"])
          });
        } else {
          this.error = response.error[0];
          this.showError = true;
          return;
        }
      })
    }
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  //End Phone number List
}