import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-property-compare',
  templateUrl: './property-compare.component.html',
  styleUrls: ['./property-compare.component.scss']
})
export class PropertyCompareComponent implements OnInit {
  trash = '/assets/images/icons/Trash-dotted.svg'
  swimm = '/assets/images/icons/swimming.svg'
  properties = [
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'}
  ];

  constructor(private authService:AuthService,private route:Router,private notifyService : NotificationService,private modalService: NgbModal, private service:AppService) {
    
  }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }


}
