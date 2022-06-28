import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-sell-residential',
  templateUrl: './sell-residential.component.html',
  styleUrls: ['./sell-residential.component.scss']
})
export class SellResidentialComponent implements OnInit {
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
