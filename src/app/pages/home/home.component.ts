import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {SliderModule} from 'primeng/slider';
import * as $ from 'jquery';
import {NgbNav} from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AppService } from 'src/app/service/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homelocationsvg = 'assets/images/home-location.svg'
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/icons/Bath-tub.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  brandimg = 'assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
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



  id: 1;
  propertyDetails:any;
  oldData1() {
    let tempData :Array<Object> = []
    this.service.LatestPropertiesListingResidential(2).subscribe(data=>{
      this.propertyDetails= data;
      this.propertyDetails = this.propertyDetails.data;

      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
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

    // this.dynamicSlides1 = [
    //   {
    //     id: 'slide1',
    //     src:'assets/images/property/1.png',
    //     alt:'Side 1',
    //     title:'Side 1',
    //     price:"250,000AED"
    //   },
    //   {
    //     id: 'slide2',
    //     src:'assets/images/property/1.png',
    //     alt:'Side 2',
    //     title:'Side 2',
    //     price:"250,000AED"
    //   },
    //   {
    //     id: 'slide3',
    //     src:'assets/images/property/1.png',
    //     alt:'Side 3',
    //     title:'Side 3',
    //     price:"250,000AED"
    //   },
    //   {
    //     id: 'slide4',
    //     src:'assets/images/property/1.png',
    //     alt:'Side 4',
    //     title:'Side 4',
    //     price:"250,000AED"
    //   },
    //   {
    //     id: 'slide5',
    //     src:'assets/images/property/1.png',
    //     alt:'Side 5',
    //     title:'Side 5',
    //     price:"250,000AED"
    //   }
    // ]
  }
  newData1() {
    let tempData :Array<Object> = []
    this.service.LatestPropertiesListingResidential(1).subscribe(data=>{
      this.propertyDetails= data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            id:element.id,
            alt:element.propertyTitle,
            src:this.baseUrl+image,
            bedrooms:element.bedrooms,
            bathrooms:element.bathrooms,
            buildingName:element.buildingName,
            carpetArea:element.carpetArea,
          });
        //   element['documents'].forEach( (innerdata, i) => {
        //     //console.log(innerdata.fileUrl);
        //   });
      })
    });
    this.dynamicSlides1 = tempData
  }

  oldData2() {
    let tempData :Array<Object> = []
    this.service.LatestPropertiesListingCommercial(2).subscribe(data=>{
      this.propertyDetails=data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
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
  }
  newData2() {
    let tempData :Array<Object> = []
    this.service.LatestPropertiesListingCommercial(1).subscribe(data=>{
      this.propertyDetails=data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element, i) => {
        let image = element.documents[0].fileUrl
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
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
  }
  tenantsslide = [
    {
      id: 'slide1',
      src:'assets/images/icons/virtul-toor.svg',
      heading:'Virtual home tour',
      desc:'You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.',
      class:'virtual-tour'
    },
    {
      id: 'slide2',
      src:'assets/images/icons/best-deal.svg',
      heading:'Find the best deal',
      desc:'Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!',
      class:'find-best-deal'
    },
    {
      id: 'slide3',
      src:'assets/images/icons/ready-apply.svg',
      heading:'Get ready to apply',
      desc:'Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!',
      class:'get-ready-apply'
    }
  ]

  Exploreplaces = [
    {
      src:'assets/images/explore-places/1.jpg',
      heading:'Al Barsha, Dubai',
      paragraph:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro...'
    },
    {
      src:'assets/images/explore-places/2.jpg',
      heading:'Business Bay, Dubai',
      paragraph:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro...'
    }
  ]

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    },
    nav: false
  }
  easyslider: OwlOptions = {
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
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
  sellrentproperty: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  testimonialslider: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  categories: any;
  types: any;
  search = new FormGroup({
    Name: new FormControl(""),
    Type: new FormControl(""),
    RentalType: new FormControl("")
  })
  propertyType: any;
  Sale: any;
  SaleAr: any;
  Rent: any;
  RentAr: any;
  propertyCategory: any;
  categoryNameRes: any;
  categoryNameArRes: any;
  categoryNameCom: any;
  categoryNameArCom: any;
  categoryDetailRes: any;
  categoryDetailResAr: any;
  categoryDetailCom: any;
  categoryDetailComAr: any;
  // valuationTransactions: any;
  totalTransactions: any;
  totalSales: any;
  totalMortgages: any;

  constructor(private service:AppService,private route:Router,private notifyService : NotificationService) {
    this.LoadPropertyCategories()
    this.LoadBlogs();
    this.oldData2();
    this.oldData1();
    this.LoadBanners();
    this.getLoadFeedback();
    this.loadCountriesData();
    this.ValuationTransactions();
    this.getOvaluateFeatures();
    this.service.PropertyListingTypes().subscribe(data=>{
      this.propertyType = data;
      this.propertyType = this.propertyType.data;
      this.Sale = this.propertyType[0].name;
      this.SaleAr = this.propertyType[0].nameAr;
      this.Rent = this.propertyType[1].name;
      this.RentAr = this.propertyType[1].nameAr;
    });

    this.service.PropertyCategories().subscribe(data=>{
      this.propertyCategory = data;
      this.propertyCategory = this.propertyCategory.data;
      this.categoryNameRes = this.propertyCategory[0].categoryName;
      this.categoryNameArRes = this.propertyCategory[0].categoryNameAr;
      this.categoryNameCom = this.propertyCategory[1].categoryName;
      this.categoryNameArCom = this.propertyCategory[1].categoryNameAr;
      this.categoryDetailRes = this.propertyCategory[0].details;
      this.categoryDetailResAr = this.propertyCategory[0].detailsAr;
      this.categoryDetailCom = this.propertyCategory[1].details;
      this.categoryDetailComAr = this.propertyCategory[1].detailsAr;
    });

    // this.service.ValuationTransactions().subscribe(data=>{
    //   this.valuationTransactions = data;
    //   this.valuationTransactions = this.valuationTransactions.data;
    //   this.totalTransactions = this.valuationTransactions[0].value;
    //   this.totalSales = this.valuationTransactions[1].value;
    //   this.totalMortgages = this.valuationTransactions[2].value;
    //
    // });
  }

  ValuationTransactions(){
    let tempData :Array<Object> = []
    this.service.ValuationTransactions().subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        tempData.push(
          {key: element.key, value: element.value});
      })
    });
    this.transaction = tempData
    // console.log(this.transaction)
  }

  ngOnInit():void {

    $(document).ready(function(){
        $('.dropdown-toggle').click(function(){
        $(this).next().toggleClass('active');
        });
    });
  }

  ProceedSearch() {
    this.submitted = true;
    if (this.search.invalid) {
      return;
    }
    if (this.search.valid) {
      // console.log(this.search.value)
      this.service.ProceedSearch(this.search.value).subscribe(result => {
        if(result!=null ){
          this.responsedata=result;
          this.responsedata.data =this.responsedata.data;
          localStorage.setItem('token',this.responsedata.data.refreshToken)
          localStorage.setItem('user',JSON.stringify(this.responsedata.data))
          this.notifyService.showSuccess(this.responsedata.message, "");
        }else{
          this.notifyService.showError("Unable to login", "");
        }
        this.route.navigate([''])
      });
    }
  }

  LoadPropertyCategories(){
    this.service.LoadPropertyCategories().subscribe(data=>{
      this.categories=data;
      // this.categories = this.categories.data
      //
      this.categories = this.categories.data.filter((category:any, key:any, array:any)=>{
        category.checked = '';
        if(key == 0){
          category.checked = 'active'
        }
        return category;
      })

    });
  }

  LoadPropertyTypes(){
    this.service.LoadPropertyTypes().subscribe(data=>{
      this.types=data;
      this.types = this.types.data
    });
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

  LoadBanners(){
    let tempData :Array<Object> = []
    this.service.LoadBanners().subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        let image = element.bannerDocument.fileUrl
        tempData.push(
          {title: element.bannerTitle, desc: element.bannerHeader, img:this.baseUrl+image});
      })
    });
    this.homebanners = tempData
  }

  loadCountriesData() {
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id });
        }
      }
    });
  }

  SubmitForm = new FormGroup({
    email : new FormControl("", Validators.required)
  });

  proceedStore(){
    if (this.SubmitForm.invalid) {
      return;
    }
    if (this.SubmitForm.valid) {
      this.service.StoreAddSubscriber(this.SubmitForm.value).subscribe(result => {
        if(result!=null){
          this.responsedata = result;
          this.notifyService.showSuccess(this.responsedata.message, "");
          this.SubmitForm.controls.email.setValue('');

          // if(this.responsedata.data !== undefined && this.responsedata.error.length < 1){
          //   this.notifyService.showSuccess(this.responsedata.message, "");
          // }else{
          //   this.notifyService.showError(this.responsedata.error[0], "");
          // }
        }else{
          this.notifyService.showError("Subscriber Failed", "");
        }
      });
    }

  }

  getLoadFeedback(){
    // this.clientFeedback = [
    //   {
    //     id: 'slide1',
    //     src:'assets/images/testimonial/user.png',
    //     heading:'Tanveer Ahemad',
    //     desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
    //     location: 'Bur Dubai, Dubai, UAE'
    //   },
    //   {
    //     id: 'slide2',
    //     src:'assets/images/testimonial/user.png',
    //     heading:'Tanveer Ahemad',
    //     desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
    //     location: 'Bur Dubai, Dubai, UAE'
    //   },
    //   {
    //     id: 'slide3',
    //     src:'assets/images/testimonial/user.png',
    //     heading:'Tanveer Ahemad',
    //     desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
    //     location: 'Bur Dubai, Dubai, UAE'
    //   }
    // ];

    let tempData :Array<Object> = []
    this.service.LoadFeeback().subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        let image = element.imageUrl
        tempData.push(
          {id:element.id,heading: element.fullName, desc: element.feedback, src:this.baseUrl+image,location:element.address});
      })
    });
    this.clientFeedback = tempData

  }

  selected = 'option1';

  ovaluateFeatures :any = [];
  getOvaluateFeatures(){
    let tempData :Array<Object> = []
    this.service.OvaluateFeatures().subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        let image = element.ovaluateFeatureDocument.fileUrl
        let className :any
        if(element.title == "Get ready to apply.  "){
          className = "get-ready-apply"
        }else if(element.title == "Virtual home tour."){
          className = "virtual-tour"
        }else if(element.title == "Find the best deal.") {
          className = "find-best-deal"
        }
        tempData.push(
          {id:element.id,heading: element.title, desc: element.description, src:this.baseUrl+image,class:className});
      })
    });
    this.ovaluateFeatures = tempData
  }
}
