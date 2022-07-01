import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'profile-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedInUser = localStorage.getItem('user')
  user : any
  constructor(private route:Router,private notifyService : NotificationService) {
    this.getUser();
  }

  ngOnInit() {
    // $(document).ready(function(){
    //     $('.sidebar-toggle').click(function(){
    //     $('body').toggleClass('sidebar-active');
    //     });
    // });
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

}
