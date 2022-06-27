import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  goggle = '../../../../assets/images/btns/google-1.svg'
  apple = '../../../../assets/images/btns/apple-1.svg'
  responsedata: any;
  submitted = false;
  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) {
    localStorage.clear();
  }
  forgot = new FormGroup({
    Email: new FormControl("", Validators.required)
  });
  get validate(){
    return this.forgot.controls;
  }
  
  ngOnInit(): void {
  }
  ProceedForgot() {
    console.log(this.forgot.valid);
    this.submitted = true;
    if (this.forgot.invalid) {
      return;
    }
    console.log(JSON.stringify(this.forgot.value, null, 2));
    if (this.forgot.valid) {
      this.service.ProceedForgot(this.forgot.value).subscribe(result => {
        if(result!=null ){
          this.responsedata=result;
          this.responsedata.data =this.responsedata.data;
          localStorage.setItem('token',this.responsedata.data.refreshToken)
          alert(this.responsedata.message)
          this.notifyService.showSuccess(this.responsedata.message, "");
          this.route.navigate(['/login'])

        }else{
          alert('Unable to proceed')
          this.notifyService.showError("Unable to proceed", ""); 
        }
        // this.route.navigate(['/login'])
      });
    }
  }

}