import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  goggle = '../../../../assets/images/btns/google-1.svg'
  apple = '../../../../assets/images/btns/apple-1.svg'
  responsedata: any;
  submitted = false;
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
  }
  constructor(private service: AuthService, private route: Router, private notifyService: NotificationService) {
    $(window).scrollTop(0);
    localStorage.clear();
  }
  forgot = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email])
  });
  get validate() {
    return this.forgot.controls;
  }
  ngOnInit(): void {
  }
  ProceedForgot() {
    this.submitted = true;
    if (this.forgot.invalid) {
      this.error = "Please Enter Email ";
      this.showError = true;
      return;
    }
    if (this.forgot.controls["Email"].invalid) {
      this.error = "Please Enter a valid Email";
      this.showError = true;
      return;
    }
    if (this.forgot.invalid) {
      return;
    }
    if (this.forgot.valid) {
      this.service.ProceedForgot(this.forgot.value).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          console.log(this.responsedata)
          if (this.responsedata.data != undefined && this.responsedata.data != null) {
            this.notifyService.showSuccess(this.responsedata.message, "");
            // this.route.navigate(['/login'])
          } else {
            this.notifyService.showError(this.responsedata.error[0], "");
          }
        } else {
          // alert('Unable to proceed')
          this.notifyService.showError("Unable to proceed", "");
        }
        // this.route.navigate(['/login'])
      });
    }
  }
}