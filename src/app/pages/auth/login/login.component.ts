import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


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
  responsedata: any;

  constructor(private service: AuthService,private route:Router) {
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
    if (this.Login.valid) {
      this.service.ProceedLogin(this.Login.value).subscribe(result => {
        if(result!=null){
          this.responsedata=result;
          localStorage.setItem('token',this.responsedata.jwtToken)
          this.route.navigate([''])
        }

      });
    }
  }
}
