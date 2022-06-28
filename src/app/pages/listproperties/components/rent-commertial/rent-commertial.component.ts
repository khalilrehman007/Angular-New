import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-rent-commertial',
  templateUrl: './rent-commertial.component.html',
  styleUrls: ['./rent-commertial.component.scss']
})
export class RentCommertialComponent implements OnInit {
  plus= '../../../../../assets/images/plus.svg'
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }

}
