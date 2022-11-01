import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../../service/app.service";

@Component({
  selector: 'app-compare-listings',
  templateUrl: './compare-listings.component.html',
  styleUrls: ['./compare-listings.component.scss']
})
export class CompareListingsComponent implements OnInit {
  trash = '/assets/images/icons/Trash-dotted.svg'
  swimm = '/assets/images/icons/swimming.svg'
  properties = [
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'لا',propertyAge:'10 ويراس',floorNo: '10',totalFloor: '25',towerBlock: 'نعم',unitNo: '123',furnishingType:'مفروشة'}
  ];

  constructor(private authService:AuthService,private route:Router,private notifyService : NotificationService,private modalService: NgbModal, private service:AppService) {
    
  }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }


}
