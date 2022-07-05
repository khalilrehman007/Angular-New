import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import {NgbNav} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from "../../service/notification.service";

import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'profile-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  blogs: any;
  proFrame = '../../assets/images/profile/pro-img-frame.png'
  proAvatar = '../../assets/images/profile/Profile-Pic.png'
  proClose = '../../assets/images/profile/close.png'
  proImgEdit = '../../assets/images/profile/edit.png'
  proEdit = '../../assets/images/profile/create.png'
  ValuationVect = '../../assets/images/profile/valution-vector.png'
  ListingVect = '../../assets/images/profile/listing-vector.png'
  ViewIcon = '../../assets/images/profile/view.png'
  CopyIcon = '../../assets/images/profile/copy.png'
  MoreIcon = '../../assets/images/profile/right-arrow.png'
  loggedInUser = localStorage.getItem('user')
  user : any
  

  
  plus= '../../../../assets/images/plus.svg'
  country = [
    {viewValue: 'India',value: 'india'},
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'America',value: 'America'},
  ];
  city = [
    {viewValue: 'India',value: 'india'},
    {viewValue: 'UAE',value: 'UAE'},
    {viewValue: 'America',value: 'America'},
  ];
  bedrooms = [
    {viewValue: '01',value: 'bedroom'},
    {viewValue: '02',value: 'bedroom'},
    {viewValue: '03',value: 'bedroom'},
  ];
  bathroom = [
    {viewValue: '01',value: 'bedroom'},
    {viewValue: '02',value: 'bedroom'},
    {viewValue: '03',value: 'bedroom'},
  ];
  
  constructor(private service:AppService,private route:Router,private notifyService : NotificationService) {
    this.getUser();
    this.LoadBlogs();
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
  LoadBlogs(){
    this.service.LoadBlogs().subscribe(data=>{
      this.blogs=data;
      this.blogs = this.blogs.data.filter((blog:any, key:any, array:any)=>{
        if(key < 3){
          return blog;
        }
      })
    });
  }

}
