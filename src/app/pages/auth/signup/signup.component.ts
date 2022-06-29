import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';


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

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    localStorage.clear();
  }
  signup = new FormGroup({
    FirstName: new FormControl("", Validators.required),
    LastName: new FormControl("", Validators.required),
    Email: new FormControl("", Validators.required),
    PhoneNumber: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  });
  get validate(){
    return this.signup.controls;
  }
  public showPassword: boolean = false;
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
