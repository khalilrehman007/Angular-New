import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../../service/app.service";

@Component({
  selector: 'app-property-compare',
  templateUrl: './property-compare.component.html',
  styleUrls: ['./property-compare.component.scss']
})
export class PropertyCompareComponent implements OnInit {
  trash = '../../../assets/images/icons/Trash-dotted.svg'
  swimm = '../../../assets/images/icons/swimming.svg'
  properties = [
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
  ];
  compareIds:any;
  baseUrl = 'https://beta.ovaluate.com/'

  constructor(private authService:AuthService,private route:Router,private notifyService : NotificationService,private modalService: NgbModal, private service:AppService) {
    this.getCompareIds();
    this.getCompareData();
  }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  getCompareIds(){
    this.compareIds = localStorage.getItem('compareIds');
    if(this.compareIds != ''){
      this.compareIds = JSON.parse(this.compareIds);
    }
    return this.compareIds;
  }

  compareData:any = [];

  getCompareData(){
    let tempData :Array<Object> = []
    this.service.ComparableProperties(this.compareIds).subscribe(data => {
      let responsedata :any = data
      console.log(responsedata.data);
      responsedata.data.forEach((element:any, i:any) => {

        let alreadyExists = true;
        this.compareHideId.forEach((idcheck:any, i:any) => {
            if(idcheck == element.id){
              alreadyExists = false;
            }
        })

        if(alreadyExists){
          let image = element.documents[0].fileUrl
          let rentType: any = '';
          if (element.rentType !== null && element.rentType !== undefined) {
            rentType = element.rentType.name
          }
          tempData.push(
            {
              title: element.propertyTitle,
              rentType: element.rentType.nameAr,
              currency: element.country.currencyAr,
              price: element.propertyPrice,
              favorite: element.favorite,
              id: element.id,
              alt: element.propertyTitle,
              src: this.baseUrl + image,
              bedrooms: element.bedrooms,
              propertyAddress: element.propertyAddress,
              bathrooms: element.bathrooms,
              buildingName: element.buildingName,
              carpetArea: element.carpetArea,
              city: element.city.nameAr,
              parkings: element.parkings,
              propertyAge: element.propertyAge,
              floorNo: element.floorNo,
              totalFloor: element.totalFloor,
              towerBlock: 'empty',
              unitNo: element.unitNo,
              furnishingType: element.furnishingType,
              propertyFeatures: element.propertyFeatures,
            });
        }
      })
    });
    this.compareData = tempData
  }

  compareHideId :any = [];
  delete(id:number){
    this.compareHideId.push(id)
    setTimeout(() => {
      this.getCompareData();
    }, 1000);
  }

}
