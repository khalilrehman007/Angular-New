import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';


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

  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
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
            this.route.navigate([''])
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
}
