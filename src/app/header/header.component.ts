import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {NotificationService} from "../service/notification.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  togglesvg = '../../assets/images/icons/toggle.svg'
  logo = '../../assets/images/logo.svg'
  chartsvg = '../../assets/images/Charts-nav.svg'
  signinsvg = '../../assets/images/user.svg'
  flagsvg = '../../assets/images/aed-fg.svg'
  close = '../../assets/images/icons/close.svg'
  property = '../../assets/images/shortlisted-img.png'
  trash = '../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../assets/images/logout-popup-banner.png'
  loggedInUser = localStorage.getItem('user')
  user : any
  availableClasses: string[] = ["sidebar-active", "nosidebar"];
  currentClassIdx: number = 0;

  params :any = {};
  bodyClass: string;
  constructor(private route:Router,private notifyService : NotificationService,private modalService: NgbModal) {
    this.getUser();
    this.bodyClass = this.availableClasses[this.currentClassIdx];
    this.changeBodyClass();
    this.params = {queryParams:{type:'Rent',PropertyListingTypeId:1}};
  }

  sidebar = [
    {
      src: '../../assets/images/icons/login.svg',
      class: 'nav-items sign-in',
      text: this.loggedInUser == null ? 'Sign in' : JSON.parse(this.loggedInUser).fullName,
      link: this.loggedInUser == null ? 'login' : 'profile',
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


  search(name:any){

  }


  changeBodyClass() {
    // get html body element
    const bodyElement = document.body;

    if (bodyElement) {


      this.currentClassIdx = this.getNextClassIdx();
      const nextClass = this.availableClasses[this.currentClassIdx];
      const activeClass = this.availableClasses[this.getPrevClassIdx()];

      // remove existing class (needed if theme is being changed)
      bodyElement.classList.remove(activeClass);
      // add next theme class
      bodyElement.classList.add(nextClass);

      this.bodyClass = nextClass;
    }
  }

  getPrevClassIdx(): number {
    return this.currentClassIdx === 0
      ? this.availableClasses.length - 1
      : this.currentClassIdx - 1;
  }

  getNextClassIdx(): number {
    return this.currentClassIdx === this.availableClasses.length - 1
      ? 0
      : this.currentClassIdx + 1;
  }
  ngOnInit() {
  }
  getUser(){
    this.user = localStorage.getItem('user');
    if(this.user != ''){
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  logout(){
    this.notifyService.showSuccess('Logout Successfully', "");
    localStorage.clear();
    this.route.navigate(['login'])
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;
  }
  status1: boolean = false;
  clickEvent1(){
      this.status1 = !this.status1;
  }
  logOutPopup(content) {
    this.modalService.open(content, { centered: true });
  }
}
