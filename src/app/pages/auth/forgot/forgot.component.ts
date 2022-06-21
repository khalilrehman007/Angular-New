import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  goggle = '../../../../assets/images/btns/google-1.svg'
  apple = '../../../../assets/images/btns/apple-1.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
