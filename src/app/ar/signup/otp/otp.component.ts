import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { data } from 'jquery';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
  }
  code: any = -1;
  string1: any;
  string2: any;
  string3: any;
  string4: any;
  string5: any;
  string6: any;
  otp: any;
  verificationData: any = {};
  minutes: number = 1;
  seconds: number = 30;
  resendDisable: boolean = true;



  keytab(prev: any, current: any, next: any, key: any) {
    if (key.key == "Backspace") {
      if (current == "input6" && $("#" + current).val() != "") {
        $("#" + current).val("");
      } else {
        $("#" + prev).val("").focus();
      }
    } else {
      if (key.key >= 0 && key.key <= 9) {
        $("#" + current).val(key.key);
        $("#" + next).focus();
      }
    }
  }

  verifyCode() {
    this.string1 = $('#input1').val();
    this.string2 = $('#input2').val();
    this.string3 = $('#input3').val();
    this.string4 = $('#input4').val();
    this.string5 = $('#input5').val();
    this.string6 = $('#input6').val();
    this.otp = this.string1 + this.string2 + this.string3 + this.string4 + this.string5 + this.string6

    if (this.code == this.otp) {
      this.auth.ProceedSignUp(this.verificationData).subscribe((result: any) => {
        console.log(result.message);
        if (result.message == "You are successfully logged in") {
          let responsedata: any = result;
          if (responsedata.data !== undefined) {
            localStorage.setItem('token', JSON.stringify(responsedata.data.refreshToken))
            localStorage.setItem('user', JSON.stringify(responsedata.data))
            this.notifyService.showSuccess(responsedata.message, "");
            this.router.navigate(['/signup/thank-you']);
          } else {
            this.notifyService.showError(responsedata.error.value, "");
          }
        } else {
          this.notifyService.showError("Unable to signup", "");
        }
      });
    } else {
      this.error = "Wrong Code";
      this.showError = true;
      return;
    }
  }
  constructor(private service: AppService, private router: Router, private auth: AuthService, private notifyService: NotificationService) {
    if (localStorage.getItem("signupData")) {
      this.verificationData = localStorage.getItem("signupData");
      this.verificationData = JSON.parse(this.verificationData);
      this.code = this.verificationData.code;
    }

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      $("#input1").focus();
    }, 100);
  }
  getCode() {
    this.service.SendDigitSms({ "FirstName": this.verificationData.FirstName, "PhoneNumber": this.verificationData.PhoneNumber }).subscribe((result: any) => {
      this.code = result.data.randomDigit;
    });
  }
  resendCode() {
    this.getCode();
    this.minutes = 1;
    this.seconds = 30;
    this.startInternal();
    this.resendDisable = true;
  }
  startInternal() {
    let a: any = setInterval(() => {
      if (this.minutes == 0 && this.seconds == 1) {
        clearInterval(a);
        this.resendDisable = false;
      }
      if (this.seconds == 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000)
  }
  ngOnInit(): void {
    this.startInternal();
  }
}