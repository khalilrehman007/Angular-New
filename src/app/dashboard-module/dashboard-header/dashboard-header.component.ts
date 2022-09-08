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

  constructor() {
  
  }
  ngOnInit(): void {
  }

}
