import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormControl, Validators } from '@angular/forms';
import { data } from 'jquery';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';

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
  string1 : any;
  string2 : any;
  string3 : any;
  string4 : any;
  string5 : any;
  string6 : any;
  otp : any;
  verificationData:any = {};
  

  keytab(prev: any, current: any, next: any, key: any) {
    if (key.key == "Backspace") {
      if(current == "input6" && $("#" + current).val() != "") {
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

  verifyCode(){
    this.string1 = $('#input1').val();
    this.string2 = $('#input2').val();
    this.string3 = $('#input3').val();
    this.string4 = $('#input4').val();
    this.string5 = $('#input5').val();
    this.string6 = $('#input6').val();
    this.otp = this.string1 + this.string2 + this.string3 + this.string4 + this.string5 + this.string6
    
    // console.log(this.otp);
    if(this.code.randomDigit == this.otp){
      this.router.navigate(['/thanku']);
    }else{
      this.error = "Wrong Code";
      this.showError = true;
      return;
    }
  }
  
  constructor(private service: AppService, private router: Router) {
    if(localStorage.getItem("verificationData")) {
      this.verificationData = localStorage.getItem("verificationData");
      this.verificationData = JSON.parse(this.verificationData);
      this.service.SendDigitSms({"FirstName":this.verificationData.name , "PhoneNumber":this.verificationData.phone}).subscribe((result:any)=>{
        this.code = result.data;
      })
    }

  }

  ngOnInit(): void {
  }

}
