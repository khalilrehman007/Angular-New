import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  hirepersonal= 'assets/images/hire-personal.png'
  hirecompany= 'assets/images/hire-cpmapny.png'
  ngOnInit(): void {
  }
  landmarksOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    rtl: true,
    touchDrag: true,
    autoWidth: false,
    pullDrag: true,
    dots: false,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  constructor(private _formBuilder: FormBuilder) {}
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
}