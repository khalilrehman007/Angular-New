import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NotificationService } from 'src/app/service/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-di-sidebar-component',
  templateUrl: './di-sidebar-component.component.html',
  styleUrls: ['./di-sidebar-component.component.scss'],
  providers: [NgbDropdownConfig]
})
export class DiSidebarComponentComponent implements OnInit {
  downloadreport = '../../../../assets/images/icons/download-svg.svg'
  togglesvg = '../../../../assets/images/icons/toggle.svg'
  logo = '../../../../assets/images/logo.svg'
  chartsvg = '../../../../assets/images/Charts-nav.svg'
  signinsvg = '../../../../assets/images/user.svg'
  flagsvg = '../../../../assets/images/aed-fg.svg'
  close = '../../../../assets/images/icons/close.svg'
  property = '../../../../assets/images/shortlisted-img.png'
  trash = '../../../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../../../assets/images/logout-popup-banner.png'
  profileimg = '../../../../assets/images/icons/profile-icon.png'
  active:any = 0;

  constructor(config: NgbDropdownConfig, private router: Router) {
    config.autoClose = false;
    let temp:any = this.router.url.split("/")[4];
    if(temp == "transaction-data") {
      this.active = 1;
    } else if(temp == "rent-data-residential") {
      this.active = 2;
    } else if(temp == "unit-transaction-residential") {
      this.active = 3;
    } else if(temp == "monthly-analysis-residential") {
      this.active = 4;
    } else if(temp == "quaterly-analysis-residential") {
      this.active = 5;
    } else if(temp == "yearly-analysis-residential") {
      this.active = 6;
    }
  }
  ngOnInit(): void {
  }
  status1: boolean = true;
  clickEvent1() {
    this.status1 = true;
    this.status2 = false;
    this.status3 = false;
    this.status4 = false;
    this.status5 = true;
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = true;
    this.status1 = false;
    this.status3 = false;
    this.status4 = false;
    this.status5 = true;
  }
  status3: boolean = false;
  clickEvent3() {
    this.status3 = true;
    this.status2 = false;
    this.status1 = false;
    this.status4 = false;
    this.status5 = true;
  }
  status4: boolean = false;
  clickEvent4() {
    this.status4 = true;
    this.status2 = false;
    this.status3 = false;
    this.status1 = false;
    this.status5 = true;
  }
  status5: boolean = false;
  clickEvent5() {
    this.status5 = !this.status5;
  }
  btnClicked(e:any) {
    this.router.navigate([e])
  }
}
