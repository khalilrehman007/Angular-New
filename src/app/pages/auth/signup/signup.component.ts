import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  goggle = '../../../../assets/images/btns/google-1.svg'
  apple = '../../../../assets/images/btns/apple-1.svg'
  info = '../../../../assets/images/info.svg'
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor() { }
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
}
