import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  videotiour = '../../../assets/images/icons/video-tour.svg'
  ovverified = '../../../assets/images/icons/ov-verified.svg'
  ngOnInit(): void {
  }
  constructor() {}
}