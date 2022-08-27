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
  code: any;
  string1 : any;
  string2 : any;
  string3 : any;
  string4 : any;
  string5 : any;
  string6 : any;
  otp : any;
  

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
        // $("#" + current).val(key.key);
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
      console.log('Verify successfully')
      this.router.navigate(['/thanku']);
    }else{
      console.log('wrong')
      alert("Enter right code")

    }
  }
  
  constructor(private service: AppService, private router: Router) {
    this.service.SendDigitSms({"FirstName":"Anirban Roy" , "PhoneNumber":"+971 50 695 9158"}).subscribe((result:any)=>{
      this.code = result.data;
      // console.log(this.code.randomDigit)
    })

  }

  ngOnInit(): void {
  }

}
