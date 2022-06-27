import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
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
  loggedInUser = localStorage.getItem('user')
  user : any
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
      text: 'buy',
      link: '',
    },
    {
      src: '../../assets/images/icons/sell.svg',
      class: 'nav-items sell',
      text: 'Sell',
      link: 'listingproperty',
    },
    {
      src: '../../assets/images/icons/building.svg',
      class: 'nav-items commertials',
      text: 'Commercials',
      link: '',
    },
    {
      src: '../../assets/images/icons/find-agents.svg',
      class: 'nav-items find-agents',
      text: 'Find Agents',
      link: '',
    },
    {
      src: '../../assets/images/icons/world.svg',
      class: 'nav-items guide',
      text: 'Guide',
      link: '',
    },
    {
      src: '../../assets/images/icons/book.svg',
      class: 'nav-items blog',
      text: 'Blog',
      link: '',
    }
  ]
  constructor(private route:Router) { 
    this.getUser();
    console.log(this.user)
  }

  ngOnInit() {
    $(document).ready(function(){
        $('.sidebar-toggle').click(function(){
        $('body').toggleClass('sidebar-active');
        });
    });
  }
  getUser(){
    this.user = localStorage.getItem('user');
    if(this.user != ''){
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['login'])
  }

}
