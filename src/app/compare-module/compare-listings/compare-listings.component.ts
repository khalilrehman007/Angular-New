import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "../../service/app.service";

@Component({
  selector: 'app-compare-listings',
  templateUrl: './compare-listings.component.html',
  styleUrls: ['./compare-listings.component.scss']
})
export class CompareListingsComponent implements OnInit {
  trash = '/assets/images/icons/Trash-dotted.svg'
  swimm = '/assets/images/icons/swimming.svg'
  properties = [
    { img: '/assets/images/pro-comparison.png', price: '350,000', title: 'Blue Wave Tower', address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi', city: 'Dubai', carpetArea: '1200', bedrooms: '2', bathrooms: '1', parkings: 'No', propertyAge: '10 yeras', floorNo: '10', totalFloor: '25', towerBlock: 'yes', unitNo: '123', furnishingType: 'Furnished' },
    { img: '/assets/images/pro-comparison.png', price: '350,000', title: 'Blue Wave Tower', address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi', city: 'Dubai', carpetArea: '1200', bedrooms: '2', bathrooms: '1', parkings: 'No', propertyAge: '10 yeras', floorNo: '10', totalFloor: '25', towerBlock: 'yes', unitNo: '123', furnishingType: 'Furnished' },
    { img: '/assets/images/pro-comparison.png', price: '350,000', title: 'Blue Wave Tower', address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi', city: 'Dubai', carpetArea: '1200', bedrooms: '2', bathrooms: '1', parkings: 'No', propertyAge: '10 yeras', floorNo: '10', totalFloor: '25', towerBlock: 'yes', unitNo: '123', furnishingType: 'Furnished' }
  ];
  propertyDetails: any = [];
  viewPropertyOne: any = "";
  viewPropertyTwo: any = "";
  viewPropertyThree: any = "";

  constructor(private authService: AuthService, private route: Router, private notifyService: NotificationService, private modalService: NgbModal, private service: AppService) {
    if (localStorage.getItem("clickProprtyOne")){
      this.viewPropertyOne = localStorage.getItem("clickProprtyOne");
      this.viewPropertyOne = JSON.parse(this.viewPropertyOne);
    }
    
    if (localStorage.getItem("clickProprtyTwo")){
      this.viewPropertyTwo = localStorage.getItem("clickProprtyTwo");
      this.viewPropertyTwo = JSON.parse(this.viewPropertyTwo);
    }
    
    if (localStorage.getItem("clickProprtyThree")){
      this.viewPropertyThree = localStorage.getItem("clickProprtyThree");
      this.viewPropertyThree = JSON.parse(this.viewPropertyThree);
      console.log(this.viewPropertyThree)
    }
    
    this.service.ComparableProperties([{ "Id": this.viewPropertyOne.id }, { "Id": this.viewPropertyTwo.id }, { "Id": this.viewPropertyThree.id }]).subscribe((result: any) => {
      this.propertyDetails = result.data;
      console.log(this.propertyDetails)
    })

  }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }


}
