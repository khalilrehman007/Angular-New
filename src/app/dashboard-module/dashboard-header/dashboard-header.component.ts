import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NotificationService } from "../../service/notification.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../service/app.service';
import { AuthService } from "../../service/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  downloadreport = '../../../assets/images/icons/download-svg.svg'
  togglesvg = '../../../assets/images/icons/toggle.svg'
  logo = '../../../assets/images/logo.svg'
  chartsvg = '../../../assets/images/Charts-nav.svg'
  signinsvg = '../../../assets/images/user.svg'
  flagsvg = '../../../assets/images/aed-fg.svg'
  close = '../../../assets/images/icons/close.svg'
  property = '../../../assets/images/shortlisted-img.png'
  trash = '../../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../../assets/images/logout-popup-banner.png'
  profileimg = '../../../assets/images/icons/profile-icon.png'

  constructor(config: NgbDropdownConfig) {
    config.autoClose = false;
  }
  ngOnInit(): void {
  }
  status1: boolean = true;
  clickEvent1() {
    this.status1 = true;
    this.status2 = false;
    this.status3 = false;
    this.status4 = false;
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = true;
    this.status1 = false;
    this.status3 = false;
    this.status4 = false;
  }
  status3: boolean = false;
  clickEvent3() {
    this.status3 = true;
    this.status2 = false;
    this.status1 = false;
    this.status4 = false;
  }
  status4: boolean = false;
  clickEvent4() {
    this.status4 = true;
    this.status2 = false;
    this.status3 = false;
    this.status1 = false;
  }
}
