import { Component, OnInit } from '@angular/core';

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
  sidebar = [
    {
      src: '../../assets/images/icons/login.svg',
      class: 'nav-items sign-in',
      text: 'Sign in',
      link: 'login',
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
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.sidebar-toggle').click(function(){
      $('body').toggleClass('sidebar-active');
      });
  });
  }

}
