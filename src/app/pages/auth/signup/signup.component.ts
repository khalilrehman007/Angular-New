import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  goggle = '../../../../assets/images/btns/google-1.svg'
  apple = '../../../../assets/images/btns/apple-1.svg'
  info = '../../../../assets/images/info.svg'
  responsedata: any;
  submitted = false;
  signUpPropertytype: any = [];

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService, private response:AppService) {
    localStorage.clear();
    this.response.ProfessionalTypes().subscribe((result:any)=>{
      this.signUpPropertytype = result.data;
      console.log(this.signUpPropertytype)

    })
  }
  signup = new FormGroup({
    FirstName: new FormControl("", Validators.required),
    LastName: new FormControl("", Validators.required),
    Email: new FormControl("", [Validators.required, Validators.email]),
    PhoneNumber: new FormControl("", Validators.required),
    Password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')])
  });
  get validate(){
    return this.signup.controls;
  }
  public showPassword: boolean = false;
  checkLength() {
    let temp:any = this.signup.value.PhoneNumber;
    if(temp.toString().length > 12) {
      alert("Max length allowes is 12");
      this.signup.patchValue({
        PhoneNumber: temp.toString().slice(0,-1)
      })
    }
  }
  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  $(document).ready(function(){
    $('.info-toogle').click(function(){
    $(this).parent().toggleClass('active');
    });
});
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ProceedSignUp() {
    this.submitted = true;
    if(this.signup.controls["Email"].invalid) {
      alert("Please Enter a valid Email");
      return
    } else if(this.signup.controls["Password"].invalid) {
      alert("Password does not meet the required pattern");
      return
    }
    if (this.signup.invalid) {
      return;
    }
    if (this.signup.valid) {
      this.service.ProceedSignUp(this.signup.value).subscribe(result => {
        if(result!=null ){
          this.responsedata = result;
          if(this.responsedata.data !== undefined){
            // this.responsedata.data = this.responsedata.data;
            localStorage.setItem('token',JSON.stringify(this.responsedata.data.refreshToken))
            localStorage.setItem('user',JSON.stringify(this.responsedata.data))
            this.notifyService.showSuccess(this.responsedata.message, "");
            this.route.navigate([''])
          }else{
            this.notifyService.showError(this.responsedata.error.value, "");
          }
        }else{
          this.notifyService.showError("Unable to signup", "");
        }
        // this.route.navigate([''])
      });
    }
  }
}
