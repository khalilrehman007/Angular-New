import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-sell-commertial',
  templateUrl: './sell-commertial.component.html',
  styleUrls: ['./sell-commertial.component.scss']
})
export class SellCommertialComponent implements OnInit {
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
