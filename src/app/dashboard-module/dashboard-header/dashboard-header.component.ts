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
  togglesvg = '../../assets/images/icons/toggle.svg'
  logo = '../../assets/images/logo.svg'
  chartsvg = '../../assets/images/Charts-nav.svg'
  signinsvg = '../../assets/images/user.svg'
  flagsvg = '../../assets/images/aed-fg.svg'
  close = '../../assets/images/icons/close.svg'
  property = '../../assets/images/shortlisted-img.png'
  trash = '../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../assets/images/logout-popup-banner.png'

  constructor() {
  
  }
  ngOnInit(): void {
  }
  navdata = [
    {
      src: '../../assets/images/icons/login.svg',
      class: 'nav-items sign-in',
      text: 'Sign in',
      link: '',
    },
    {
      src: '../../assets/images/icons/ioi.svg',
      class: 'nav-items buy',
      text: 'Buy',
      link: '/search/Buy',
    },
    {
      src: '../../assets/images/icons/rent-icon.svg',
      class: 'nav-items buy',
      text: 'Rent',
      link: '/search/Rent',
    },
    {
      src: '../../assets/images/icons/sell.svg',
      class: 'nav-items sell',
      text: 'Sell',
      link: '/sellrent',
    },
    {
      src: '../../assets/images/icons/find-agents.svg',
      class: 'nav-items find-agents',
      text: 'Find Agents',
      link: '/find-agent',
    },
    {
      src: '../../assets/images/icons/world.svg',
      class: 'nav-items guide',
      text: 'Guide',
      link: 'explore',
    },
    {
      src: '../../assets/images/icons/book.svg',
      class: 'nav-items blog',
      text: 'Blog',
      link: 'blogs',
    }
  ]



}
