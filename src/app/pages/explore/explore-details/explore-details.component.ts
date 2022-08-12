import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-explore-details',
  templateUrl: './explore-details.component.html',
  styleUrls: ['./explore-details.component.scss']
})
export class ExploreDetailsComponent implements OnInit {
  homelocationsvg = '../../../../assets/images/home-location.svg'
  bedsvg = '../../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../../assets/images/home-location.svg'
  squaremetersvg = '../../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../../assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  exploreimg='../../../../assets/images/Blog-Tile.png'
  restaurant= '../../../../assets/images/icons/restaurant.svg'
  exploredemo= '../../../../assets/images/explore-demo.png'
  dubaigv = 'assets/images/goverment-of-dubai.png'
  landdept = 'assets/images/Dubai-Land-LOGO.png'
  rera = 'assets/images/rera.png'
  baseUrl = 'https://beta.ovaluate.com/'
  blogs: any;
  submitted = false;
  responsedata: any;
  dynamicSlides1:any = [];
  dynamicSlides2:any = [];
  homebanners:any = [];
  transaction:any = [];
  country:any = [];
  clientFeedback:any = [];
  slider: any = [];



  id: 1;
  propertyDetails:any;
  oldData1() {
    let tempData :Array<Object> = []
    this.service.PropertiesListingResidentialByDistrict({ "DistictId": this.id,"PropertyListingTypeId": "1" }).subscribe(data=>{
      this.propertyDetails= data;
      this.propertyDetails = this.propertyDetails.data;

      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            rentType: element.rentType.name,
            currency: element.country.currency,
            price: element.propertyPrice,
            id:element.id,
            alt:element.propertyTitle,
            src:this.baseUrl+image,
            bedrooms:element.bedrooms,
            propertyAddress:element.propertyAddress,
            bathrooms:element.bathrooms,
            buildingName:element.buildingName,
            carpetArea:element.carpetArea,
          });
      })
    });
    this.dynamicSlides1 = tempData
    console.log(this.dynamicSlides1,'ResidentialOld')
  }
  newData1() {
    let tempData :Array<Object> = []
    this.service.PropertiesListingResidentialByDistrict({ "DistictId": this.id,"PropertyListingTypeId": "1" }).subscribe(data=>{
      this.propertyDetails= data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: element.rentType.name,
            currency: element.country.currency,
            propertyAddress:element.propertyAddress,
            id:element.id,
            alt:element.propertyTitle,
            src:this.baseUrl+image,
            bedrooms:element.bedrooms,
            bathrooms:element.bathrooms,
            buildingName:element.buildingName,
            carpetArea:element.carpetArea,
          });
      })
    });
    this.dynamicSlides1 = tempData
    console.log(this.dynamicSlides1,'ResidentialNew')

  }

  oldData2() {
    let tempData :Array<Object> = []
    this.service.PropertiesListingCommercialByDistrict({ "DistictId": this.id,"PropertyListingTypeId": "1" }).subscribe(data=>{
      this.propertyDetails=data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: element.rentType.name,
            currency: element.country.currency,
            propertyAddress:element.propertyAddress,
            id:element.id,
            alt:element.propertyTitle,
            src:this.baseUrl+image,
            bedrooms:element.bedrooms,
            bathrooms:element.bathrooms,
            buildingName:element.buildingName,
            carpetArea:element.carpetArea,
          });
      })
    });
    this.dynamicSlides2 = tempData
    console.log(this.dynamicSlides2,'CommercialOld')

  }
  newData2() {
    let tempData :Array<Object> = []
    this.service.PropertiesListingCommercialByDistrict({ "DistictId": this.id,"PropertyListingTypeId": "1" }).subscribe(data=>{
      this.propertyDetails=data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: element.rentType.name,
            currency: element.country.currency,
            propertyAddress:element.propertyAddress,
            id:element.id,
            alt:element.propertyTitle,
            src:this.baseUrl+image,
            bedrooms:element.bedrooms,
            bathrooms:element.bathrooms,
            buildingName:element.buildingName,
            carpetArea:element.carpetArea,
          });
      })
    });
    this.dynamicSlides2 = tempData
    console.log(this.dynamicSlides2,'CommercialNew')

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  districtDetail:any = {};

  constructor(private route: ActivatedRoute, private service: AppService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.service.ExploreDistrict(this.id).subscribe((result:any) => {
      this.districtDetail = result.data;
      console.log(this.districtDetail);
    });
    this.oldData2();
    this.oldData1();
   }

  ngOnInit(): void {
  }
  status: boolean = true;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  status5: boolean = false;
  Overview() {
    this.status = !this.status;
    this.status1 = false;
    this.status2 = false;
    this.status3 = false;
  }
  NearBy() {
    this.status = false;
    this.status1 = !this.status1;
    this.status2 = false;
    this.status3 = false;
  }
  ResPro() {
    this.status = false;
    this.status1 = false;
    this.status2 = !this.status2;
    this.status3 = false;
  }
  ComPro() {
    this.status = false;
    this.status1 = false;
    this.status2 = false;
    this.status3 = !this.status3;
  }

}
