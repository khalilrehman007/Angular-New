import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "../../service/app.service";
import { environment } from 'src/environments/environment';
import { data } from 'jquery';

@Component({
  selector: 'app-compare-listings',
  templateUrl: './compare-listings.component.html',
  styleUrls: ['./compare-listings.component.scss']
})
export class CompareListingsComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
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
  property1: any = "";
  property2: any = "";
  property3: any = "";

  constructor(private authService: AuthService, private route: Router, private notifyService: NotificationService, private modalService: NgbModal, private service: AppService) {
    if (localStorage.getItem("clickProprtyOne")) {
      this.viewPropertyOne = localStorage.getItem("clickProprtyOne");
      this.viewPropertyOne = JSON.parse(this.viewPropertyOne);
      this.service.PropertyListingDetailComparison(this.viewPropertyOne.id).subscribe((response: any) => {
        console.log(response);
        this.propertyDetails.push(response.data);
      });
    }
    
    if (localStorage.getItem("clickProprtyTwo")) {
      this.viewPropertyTwo = localStorage.getItem("clickProprtyTwo");
      this.viewPropertyTwo = JSON.parse(this.viewPropertyTwo);
      this.service.PropertyListingDetailComparison(this.viewPropertyTwo.id).subscribe((response: any) => {
        this.propertyDetails.push(response.data);
      });
    }
    
    if (localStorage.getItem("clickProprtyThree")) {
      this.viewPropertyThree = localStorage.getItem("clickProprtyThree");
      this.viewPropertyThree = JSON.parse(this.viewPropertyThree);
      this.service.PropertyListingDetailComparison(this.viewPropertyThree.id).subscribe((response: any) => {
        this.propertyDetails.push(response.data);
      });
    }
    if (localStorage.getItem("compareProperty")) {
      let temp:any = localStorage.getItem("compareProperty");
      temp = JSON.parse(temp);
      this.service.PropertyListingDetailComparison(temp[0].id).subscribe((response: any) => {
        this.propertyDetails.push(response.data);
      });
      this.service.PropertyListingDetailComparison(temp[1].id).subscribe((response: any) => {
        this.propertyDetails.push(response.data);
      });
      this.service.PropertyListingDetailComparison(temp[2].id).subscribe((response: any) => {
        this.propertyDetails.push(response.data);
        console.log(this.propertyDetails)
      });
    }
    if (!localStorage.getItem("user")){
      this.route.navigate(['/login'])
    }
  }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  removeProperty(e: any) {
    console.log(e);
    let temp: any = [];
    temp = this.propertyDetails.filter((item: any) => item.id != e);
    this.propertyDetails = temp;
  }
}
