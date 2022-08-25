import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import { data } from 'jquery';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  code:any;

  constructor(private service: AppService) {
    this.service.SendDigitSms({"FirstName":"Anirban Roy" , "PhoneNumber":"+971 50 695 9158"}).subscribe((result:any)=>{
      this.code = result.data;
      console.log(this.code)
    })
   }

  ngOnInit(): void {
  }

}
