import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../../service/app.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NotificationService } from "../../../service/notification.service";
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "../../../service/auth.service";
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import 'hammerjs';


declare const google: any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  @ViewChild('propertyDetails__map') mapElement: any;
  homelocationsvg = 'assets/images/home-location.svg'
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/icons/Bath-tub.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  brandimg = 'assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  dots = 'assets/images/dots.svg'
  blueheart = 'assets/images/blue-heart.svg'
  thumb1 = 'assets/images/slider-thumb-1.png'
  thumb2 = 'assets/images/slider-thumb-2.png'
  furnishing = 'assets/images/icons/furnishing.svg'
  ovverified = 'assets/images/icons/ov-verified.svg'
  qrscan = 'assets/images/icons/qr-code-scan.svg'
  gallery = 'assets/images/icons/gallery-img.svg'
  pricedemo = 'assets/images/rental-price-trends.png'
  restaurant = 'assets/images/icons/restaurant.svg'
  exploredemo = 'assets/images/explore-demo.png'
  propertylistedbrand = 'assets/images/better-home.svg'
  propertylisteby = 'assets/images/listed-by.svg'
  call = 'assets/images/icons/call.svg'
  whatsapp = 'assets/images/icons/whatsapp.svg'
  chat = 'assets/images/icons/chat.svg'
  videocall = 'assets/images/icons/video-call.svg'
  virtual = 'assets/images/icons/virtual-tour.svg'
  homeaddress = 'assets/images/icons/home-location-white.svg'
  twitter = 'assets/images/icons/twiiter-share.svg'
  qr = 'assets/images/icons/qr-share.svg'
  fb = 'assets/images/icons/fb-share.svg'
  tagicn = 'assets/images/icons/tag-icn.svg'
  homeLoc = 'assets/images/home-location.svg'
  user: any
  baseUrl = environment.apiUrl;
  status: boolean = true;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  shareURL: any = "";
  keyhighlight() {
    this.status = !this.status;
    this.status1 = false;
    this.status2 = false;
    this.status3 = false;
    this.status4 = false;
  }
  PropertyInfo() {
    this.status = false;
    this.status1 = !this.status1;
    this.status2 = false;
    this.status3 = false;
    this.status4 = false;
  }
  Amenities() {
    this.status = false;
    this.status1 = false;
    this.status2 = !this.status2;
    this.status3 = false;
    this.status4 = false;
  }
  PriceTrends() {
    this.status = false;
    this.status1 = false;
    this.status2 = false;
    this.status3 = !this.status3;
    this.status4 = false;
  }
  Location() {
    this.status = false;
    this.status1 = false;
    this.status2 = false;
    this.status4 = !this.status4;
    this.status3 = false;
  }

  eventlist = [
    {
      img: 'assets/images/slider.png',
    },
    {
      img: 'assets/images/slider.png',
    },
    {
      img: 'assets/images/slider.png',
    },
    {
      img: 'assets/images/slider.png',
    },
  ]
  amentiesinfo = [
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      img: 'assets/images/icons/swimming.svg',
      value: 'Swimming Pool',
    },
    {
      btnvalue: '+23 more Amenities',
    },
  ]
  propertyinfo: any = [];
  closeResult: string = "";
  propertyDetail: any;
  districtDetail: any = {};
  dataLoaded: boolean = false;
  propertyId: any;
  userId: any;
  propertyLat: any = 0;
  propertyLng: any = 0;
  buildingName: any;
  map: any;
  bounds: any = [];
  id: number = 1;
  propertyData: any = "";
  userData: any = [];
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  chartLabel: any = []
  chartData: any = []


  public lineChartData: any = {
    labels: this.chartLabel,
    datasets: [
      {
        data: this.chartData,
        label: 'Series A',
        fill: false,
        tension: 0.5,
        borderColor: '#8dbfde',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#8dbfde',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1B1571',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 70,
          minRotation: 70,
        }
      },
    },
    plugins: {
      title: {
        display: true,
        position: 'left',
        align: 'center',
        text: 'AED/Year'
      },
    }
  };
  public lineChartLegend = true;

  constructor(private location: Location, private authService: AuthService, private domSanitizer: DomSanitizer, private activeRoute: ActivatedRoute, private modalService: NgbModal, private service: AppService, private route: Router, private notifyService: NotificationService) {
    let temp: any = window.location.href;
    temp = temp.split("/");
    temp[1] = "//";
    temp[2] = temp[2] + "/";
    temp[3] = temp[3] + "/";
    temp.pop().toString().replaceAll(",", "");
    this.shareURL = temp.toString().replaceAll(",", "");
    this.route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        $(window).scrollTop(0);
        this.propertyId = this.activeRoute.snapshot.queryParamMap.get('id');
        this.getUser();
        let userId = '';
        if (this.user !== null) {
          userId = this.user.id;
        }
        this.userId = userId;
        this.LoadSimilarProperty();
        this.getloadDashboardData();
      }
    });
    this.galleryOptions = [];
    this.galleryImages = [];
  }
  goBack() {
    this.location.back();
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
  locationAddress1 = '';
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '700px',
        imagePercent: 100,
        thumbnailsColumns: 8,
        thumbnailsMargin: 5,
        thumbnailsSwipe: true,
        thumbnailsArrows: false,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '700px',
        imagePercent: 100,
        thumbnailsColumns: 5,
        thumbnailsMargin: 5,
        thumbnailsArrows: false,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    // this.galleryImages = [
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },{
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   },
    //   {
    //     small: 'assets/images/slider.png',
    //     medium: 'assets/images/slider.png',
    //     big: 'assets/images/slider.png'
    //   }
    // ];
  }


  isload: any = false
  propertyDetailData: any = {}

  documentCheck: any = true
  getloadDashboardData() {
    return this.service.DisplayPropertyListing({ "PropertyListingId": this.propertyId, "LoginUserId": this.userId }).subscribe((e: any) => {
      let temp: any = e;
      console.log("temp",temp)
      this.propertyData = e.data.propertyListing;
      this.userData = temp.data.user;
      this.propertyLat = temp.data.propertyListing.propertyLat;
      this.propertyLng = temp.data.propertyListing.propertyLong;
      this.buildingName = temp.data.propertyListing.buildingName;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.propertyDetail = jsonParsDate
      this.isload = true

      // this.map = new mapboxgl.Map({
      //   accessToken: environment.mapbox.accessToken,
      //   container: 'property-near-map',
      //   style: 'mapbox://styles/mapbox/streets-v11',
      //   center: [this.propertyLng, this.propertyLat],
      //   zoom: 11,
      // })
      // let marker = new mapboxgl.Marker({ color: "#FF0000", draggable: false }).setLngLat([this.propertyLng, this.propertyLat]).addTo(this.map).setPopup(
      //   new mapboxgl.Popup({ offset: 25, focusAfterOpen: false }) // add popups
      //     .setHTML(this.buildingName)
      // ).togglePopup();
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { "lat": parseFloat(this.propertyLat), "lng": parseFloat(this.propertyLng) },
        zoom: 16,
        disableDefaultUI: true,
      });
      let marker = new google.maps.Marker({
        position: { "lat": parseFloat(this.propertyLat), "lng": parseFloat(this.propertyLng) },
        map: this.map,
        label: {
          className: 'map-marker-label',
          text: this.buildingName==""?"Location":this.buildingName
        },
      });
      let tenantType: any = '';
      if (jsonParsDate.propertyListing.tenantType !== null && jsonParsDate.propertyListing.tenantType?.name !== null && jsonParsDate.propertyListing.tenantType?.name !== undefined) {
        tenantType = jsonParsDate.propertyListing.tenantType.name
      }

      let occupancyStatus: any = '';
      if (jsonParsDate.propertyListing.occupancyStatus !== null && jsonParsDate.propertyListing.occupancyStatus.name !== null && jsonParsDate.propertyListing.occupancyStatus.name !== undefined) {
        occupancyStatus = jsonParsDate.propertyListing.occupancyStatus.name
      }
      let propertyManage: any = '';
      if (jsonParsDate.propertyListing.propertyManage !== null && jsonParsDate.propertyListing.propertyManage?.name !== null && jsonParsDate.propertyListing.propertyManage?.name !== undefined) {
        propertyManage = jsonParsDate.propertyListing.propertyManage.name
      }

      let rentType: any = '';
      if (jsonParsDate.propertyListing.rentType !== null && jsonParsDate.propertyListing.rentType?.name !== null && jsonParsDate.propertyListing.rentType?.name !== undefined && jsonParsDate.propertyListing.propertyListingTypeId != 2) {
        rentType = jsonParsDate.propertyListing.rentType.name
      }

      if (jsonParsDate.propertyListing != null) {
        this.propertyDetailData.propertyPrice = (jsonParsDate.propertyListing.propertyPrice !== undefined) ? jsonParsDate.propertyListing.propertyPrice : ''
        this.propertyDetailData.currency = (jsonParsDate.propertyListing.country.currency !== undefined) ? jsonParsDate.propertyListing.country.currency : ''
        // this.propertyDetailData.rentType = (jsonParsDate.propertyListing.rentType !== undefined) ? jsonParsDate.propertyListing.rentType : ''
        this.propertyDetailData.securityDepositPrice = (jsonParsDate.propertyListing.securityDepositPrice !== undefined) ? jsonParsDate.propertyListing.securityDepositPrice : ''
        this.propertyDetailData.brokerageChargePrice = (jsonParsDate.propertyListing.brokerageChargePrice !== undefined) ? jsonParsDate.propertyListing.brokerageChargePrice : ''
        this.propertyDetailData.buildingName = (jsonParsDate.propertyListing.buildingName !== undefined) ? jsonParsDate.propertyListing.buildingName : ''
        this.propertyDetailData.documents = (jsonParsDate.propertyListing.documents !== undefined) ? jsonParsDate.propertyListing.documents : []
        this.propertyDetailData.propertyAddress = (jsonParsDate.propertyListing.propertyAddress !== undefined) ? jsonParsDate.propertyListing.propertyAddress : ''
        this.propertyDetailData.bedrooms = (jsonParsDate.propertyListing.bedrooms !== undefined) ? jsonParsDate.propertyListing.bedrooms : ''
        this.propertyDetailData.bathrooms = (jsonParsDate.propertyListing.bathrooms !== undefined) ? jsonParsDate.propertyListing.bathrooms : ''
        this.propertyDetailData.carpetArea = (jsonParsDate.propertyListing.carpetArea !== undefined) ? jsonParsDate.propertyListing.carpetArea : ''
        this.propertyDetailData.unitType = (jsonParsDate.propertyListing.country.unitType !== undefined) ? jsonParsDate.propertyListing.country.unitType : ''
        this.propertyDetailData.furnishingType = (jsonParsDate.propertyListing.propertyAddress !== undefined) ? jsonParsDate.propertyListing.propertyAddress : ''
        this.propertyDetailData.propertyDescription = (jsonParsDate.propertyListing.propertyDescription !== undefined) ? jsonParsDate.propertyListing.propertyDescription : ''
        // this.propertyDetailData.propertyDescription = (jsonParsDate.propertyListing.propertyDescription !== undefined) ? jsonParsDate.propertyListing.propertyDescription : ''
        this.propertyDetailData.propertyFeatures = (jsonParsDate.propertyListing.propertyFeatures !== undefined) ? jsonParsDate.propertyListing.propertyFeatures : ''
        // this.propertyDetailData.propertyType = (jsonParsDate.propertyListing.propertyType !== undefined) ? jsonParsDate.propertyListing.propertyType : ''
        this.propertyDetailData.requestedDateFormat = (jsonParsDate.propertyListing.requestedDateFormat !== undefined) ? jsonParsDate.propertyListing.requestedDateFormat : ''
        this.propertyDetailData.buildingType = (jsonParsDate.propertyListing.propertyCategory.categoryName !== undefined) ? jsonParsDate.propertyListing.propertyCategory.categoryName : ''
        this.propertyDetailData.propertyType = (jsonParsDate.propertyListing.propertyType.typeDescription !== undefined) ? jsonParsDate.propertyListing.propertyType.typeDescription : ''
        this.propertyDetailData.buildingName = (jsonParsDate.propertyListing.buildingName !== undefined) ? jsonParsDate.propertyListing.buildingName : ''
        this.propertyDetailData.totalFloor = (jsonParsDate.propertyListing.totalFloor !== undefined) ? jsonParsDate.propertyListing.totalFloor : ''
        this.propertyDetailData.floorNo = (jsonParsDate.propertyListing.floorNo !== undefined) ? jsonParsDate.propertyListing.floorNo : ''
        this.propertyDetailData.unitNo = (jsonParsDate.propertyListing.unitNo !== undefined) ? jsonParsDate.propertyListing.unitNo : ''
        this.propertyDetailData.bedrooms = (jsonParsDate.propertyListing.bedrooms !== undefined) ? jsonParsDate.propertyListing.bedrooms : ''
        this.propertyDetailData.bathrooms = (jsonParsDate.propertyListing.bathrooms !== undefined) ? jsonParsDate.propertyListing.bathrooms : ''
        this.propertyDetailData.furnishingType = (jsonParsDate.propertyListing.fittingTypeAr !== undefined) ? jsonParsDate.propertyListing.fittingTypeAr : ''
        this.propertyDetailData.fittingType = (jsonParsDate.propertyListing.fittingTypeAr !== undefined) ? jsonParsDate.propertyListing.fittingTypeAr : ''
        this.propertyDetailData.tenantType = tenantType
        this.propertyDetailData.gender = (jsonParsDate.propertyListing.genderAr !== undefined) ? jsonParsDate.propertyListing.genderAr : ''
        this.propertyDetailData.parkings = (jsonParsDate.propertyListing.parkings !== undefined) ? jsonParsDate.propertyListing.parkings : ''
        this.propertyDetailData.carpetArea = (jsonParsDate.propertyListing.carpetArea !== undefined) ? jsonParsDate.propertyListing.carpetArea : ''
        this.propertyDetailData.buildupArea = (jsonParsDate.propertyListing.buildupArea !== undefined) ? jsonParsDate.propertyListing.buildupArea : ''
        this.propertyDetailData.occupancyStatus = occupancyStatus
        this.propertyDetailData.propertyManage = propertyManage
        this.propertyDetailData.rentType = rentType
        this.propertyDetailData.securityDepositPrice = (jsonParsDate.propertyListing.securityDepositPrice !== undefined) ? jsonParsDate.propertyListing.securityDepositPrice : ''
        this.propertyDetailData.brokerageChargePrice = (jsonParsDate.propertyListing.brokerageChargePrice !== undefined) ? jsonParsDate.propertyListing.brokerageChargePrice : ''
        this.propertyDetailData.availableDate = (jsonParsDate.propertyListing.availableDate !== undefined) ? jsonParsDate.propertyListing.availableDate : ''
        this.propertyDetailData.noticePeriod = (jsonParsDate.propertyListing.noticePeriod !== undefined) ? jsonParsDate.propertyListing.noticePeriod : ''
        this.propertyDetailData.lockingPeriod = (jsonParsDate.propertyListing.lockingPeriod !== undefined) ? jsonParsDate.propertyListing.lockingPeriod : ''
        this.propertyDetailData.propertyLat = (jsonParsDate.propertyListing.propertyLat !== undefined) ? jsonParsDate.propertyListing.propertyLat : ''
        this.propertyDetailData.propertyLong = (jsonParsDate.propertyListing.propertyLong !== undefined) ? jsonParsDate.propertyListing.propertyLong : ''
        this.propertyDetailData.id = (jsonParsDate.propertyListing.id !== undefined) ? jsonParsDate.propertyListing.id : ''
        this.propertyDetailData.favorite = (jsonParsDate.propertyListing.favorite !== undefined) ? jsonParsDate.propertyListing.favorite : ''
        this.propertyDetailData.propertyListingTypeId = (jsonParsDate.propertyListing.propertyListingTypeId !== undefined) ? jsonParsDate.propertyListing.propertyListingTypeId : 0
        this.propertyDetailData.propertyCode = (jsonParsDate.propertyListing.propertyCode !== undefined) ? jsonParsDate.propertyListing.propertyCode : 0
        // share url concatination

        this.shareURL += this.propertyDetailData.id;

        //gallery images
        for (let i = 0; i < this.propertyDetailData.documents.length; i++) {
          this.galleryImages.push({
            small: this.baseUrl + this.propertyDetailData.documents[i].fileUrl.replaceAll("\\", "/"),
            medium: this.baseUrl + this.propertyDetailData.documents[i].fileUrl.replaceAll("\\", "/"),
            big: this.baseUrl + this.propertyDetailData.documents[i].fileUrl.replaceAll("\\", "/")
          });
        }

        let ree = "https://maps.google.com/maps?q=" + this.propertyDetailData.propertyLat + "," + this.propertyDetailData.propertyLong + "&hl=es&z=14&amp;output=embed"
        let resp: any = this.domSanitizer.bypassSecurityTrustUrl(ree);
        this.locationAddress1 = resp


        if (this.propertyDetail.propertyListing.documents.length == 0) {
          this.documentCheck = false;
        }

        if (this.propertyDetail.propertyListing.documents[0]?.fileUrl != null && this.propertyDetail.propertyListing.documents[0]?.fileUrl !== undefined) {
          this.thumb1 = this.baseUrl + this.propertyDetail.propertyListing.documents[0]?.fileUrl;
        }
        if (this.propertyDetail.propertyListing.documents.length > 0 && this.propertyDetail.propertyListing.documents[1]?.fileUrl !== undefined) {
          this.thumb2 = this.baseUrl + this.propertyDetail.propertyListing.documents[1]?.fileUrl;
        }

        if (jsonParsDate.detailsChart != null) {
          jsonParsDate.detailsChart.chart.forEach((element: any, i: any) => {
            let date: any = element.date
            let price: any = element.price
            this.chartLabel.push(date);
            this.chartData.push(price);
          })
        }

        this.getPropertyInfo();

      } else {
        //if property not found redirect home page
        this.notifyService.showError('Property No found!', "");
        this.route.navigate(['/'])
        ///end
      }
      if (jsonParsDate.user != null && jsonParsDate.user != undefined && jsonParsDate.user.imageUrl != null) {
        this.propertyDetailData.userImageUrl = (jsonParsDate.user.imageUrl !== undefined) ? this.baseUrl + jsonParsDate.user.imageUrl : '../assets/images/user.png'
        this.propertyDetailData.userfullName = (jsonParsDate.user.fullName !== undefined) ? jsonParsDate.user.fullName : ''
      } else {
        this.propertyDetailData.userImageUrl = '../assets/images/user.png'
        this.propertyDetailData.userfullName = ''
      }

      this.lineChartData = {
        labels: this.chartLabel,
        datasets: [
          {
            data: this.chartData,
            label: 'Series A',
            fill: false,
            tension: 0.5,
            borderColor: '#8dbfde',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#8dbfde',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#1B1571',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }
        ]
      }

    });
  }
  getPropertyInfo() {
    this.propertyinfo = [
      {
        label: 'مدرج في',
        value: this.propertyDetailData.requestedDateFormat,
      },
      {
        label: 'تم التحقق من الرمز التحقق',
        value: this.propertyDetailData.requestedDateFormat,
      },
      {
        label: 'نوع البناية',
        value: this.propertyData.propertyCategory.categoryNameAr,
      },
      {
        label: 'نوع العقار',
        value: this.propertyData.propertyType.typeDescriptionAr,
      },
      {
        label: 'رقم البرج / اسم المبنى',
        value: this.propertyDetailData.buildingName,
      },
      {
        label: 'عدد الأدوار في المبنى',
        value: this.propertyDetailData.totalFloor,
      },
      {
        label: 'رقم الطابق',
        value: this.propertyDetailData.floorNo,
      },
      {
        label: 'رقم الوحدة',
        value: this.propertyDetailData.unitNo,
      },
      {
        label: 'غرفة نوم',
        value: this.propertyDetailData.bedrooms,
      },
      {
        label: 'حمام',
        value: this.propertyDetailData.bathrooms,
      },
      {
        label: 'نوع الاثاث',
        value: this.propertyDetailData.furnishingType,
      },
      {
        label: 'نوع التجهيزات',
        value: this.propertyDetailData.fittingType,
      },
      {
        label: 'نوع المستأجر المفضل',
        value: this.propertyData.tenantType?.nameAr,
      },
      {
        label: 'نوع الجنس المفضل',
        value: this.propertyDetailData.gender,
      },
      {
        label: 'المواقف المتاحة',
        value: this.propertyDetailData.parkings,
      },
      {
        label: 'سياسة الحيوانات الأليفة',
        value: "-",
      },
      {
        label: 'منطقة التأجير',
        value: this.propertyDetailData.carpetArea,
      },
      {
        label: 'المساحة الإجمالية للبناء',
        value: this.propertyDetailData.buildupArea,
      },
      { show: this.propertyDetailData.propertyListingTypeId==2?true:false,
        label: 'حالة الإشغال الحالية',
        value: this.propertyData.occupancyStatus.nameAr,
      },
      {
        label: 'الملكية تدار من قبل',
        value: this.propertyData.propertyManage?.nameAr,
      },
      {
        label: 'سعر',
        value: this.propertyDetailData.propertyPrice + ' ' + this.propertyData.country?.currencyAr,
      },
      {
        label: 'نوع الإيجار',
        value: this.propertyDetailData.propertyPrice + ' ' + this.propertyData.country?.currencyAr,
      },
      {
        label: 'مبلغ التأمين',
        value: this.propertyDetailData.securityDepositPrice + ' ' + this.propertyData.country?.currencyAr,
      },
      {
        label: 'رسوم الوساطة',
        value: this.propertyDetailData.brokerageChargePrice + ' ' + this.propertyData.country?.currencyAr,
      },
      {
        label: 'متاح من',
        value: this.propertyDetailData.availableDate.split("T")[0],
      },
      {
        label: 'فترة إشعار',
        value: this.propertyDetailData.noticePeriod,
      },
      {
        label: 'الإغلاق',
        value: this.propertyDetailData.lockingPeriod,
      },
    ]
    if (this.propertyData.petPolicies.length == 0) {
      this.propertyinfo[15].value = "-";
    } else {
      let temp: any = "";
      for (let i = 0; i < this.propertyData.petPolicies.length; i++) {
        temp += "-";
      }
      this.propertyinfo[15].value = "-";
    }

  }
  loadChat() {
    window.open("/chat", "_blank")
  }
  SubmitForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    message: new FormControl("", Validators.required),
  });

  responsedata: any;
  leadData: any = {};
  nameError: any = '';
  emailError: any = '';
  phoneError: any = '';
  messageError: any = '';
  error: any = ""

  checkLength() {
    let temp: any = this.SubmitForm.value.phone;
    if (temp.toString().length > 12) {
      this.error = "Max length allows is 12"
      this.SubmitForm.patchValue({
        phone: temp.toString().slice(0, -1)
      })
    }
  }

  leadProceedStore() {
    if (this.SubmitForm.invalid) {
      if (this.SubmitForm.value.name == '') {
        this.nameError = "Name required"
      } else {
        this.nameError = ""
      }
      if (this.SubmitForm.value.email == '') {
        this.emailError = "Email required"
      } else {
        this.emailError = ""
      }
      if (this.SubmitForm.value.phone == '') {
        this.phoneError = "Phone required"
      } else {
        this.phoneError = ""
      }
      if (this.SubmitForm.value.message == '') {
        this.messageError = "Message required"
      } else {
        this.messageError = ""
      }
      return;
    }


    // if(this.user == null ){
    //   this.route.navigate(['login'])
    //   this.notifyService.showWarning('First you need login!', "Warning");
    // }
    if (this.SubmitForm.valid) {
      this.leadData.name = this.SubmitForm.value.name
      this.leadData.email = this.SubmitForm.value.email
      this.leadData.phone = this.SubmitForm.value.phone
      this.leadData.message = this.SubmitForm.value.message
      this.leadData.PropertyListingId = this.propertyId
      this.leadData.UserId = this.propertyDetail.user.id
      this.leadData.LoginUserId = this.userId

      this.service.StoreLead(this.leadData).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          if (this.responsedata.message == "User Lead  submitted successfully") {
            if (this.responsedata.data !== undefined && this.responsedata.error.length < 1) {
              this.SubmitForm.controls.name.setValue('');
              this.SubmitForm.controls.email.setValue('');
              this.SubmitForm.controls.phone.setValue('');
              this.SubmitForm.controls.message.setValue('');

              this.nameError = ''
              this.emailError = ''
              this.phoneError = ''
              this.messageError = ''

              this.notifyService.showSuccess(this.responsedata.message, "");
            } else {
              this.notifyService.showError(this.responsedata.error[0], "");
            }
          }
        } else {
          this.notifyService.showError("User Lead  submitted Failed", "");
        }
      });
    }

  }

  similarPropertyDetails: any = []

  LoadSimilarProperty() {
    let tempData: Array<Object> = []
    this.service.LoadSimilarProperty({ "UserId": this.userId, "PropertyListingId": this.propertyId }).subscribe(data => {
      let response: any = data;
      this.similarPropertyDetails = response.data;
      response.data.forEach((element: any, i: any) => {
        let image = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        }
      })
    });
    // this.similarPropertyDetails = tempData
  }

  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  title = 'ng2-charts-demo';

  wishlistStatus: any;
  AddToFavorite(id: any, status: any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    this.service.FavoriteAddRemove(status, { "UserId": this.userId, "PropertyListingId": id }).subscribe(data => {
      let responsedata: any = data
      if (responsedata.message == "Favorite is Removed successfully") {
        this.wishlistStatus = "Favorite is Removed successfully"
        this.notifyService.showSuccess('Favorite is Removed successfully', "");
        setTimeout(() => {
          this.getUser();
          this.getloadDashboardData();
          this.LoadSimilarProperty();
        }, 1000);
      } else {
        this.wishlistStatus = "Favorite is added successfully"
        this.notifyService.showSuccess('Favorite is added successfully', "");
        setTimeout(() => {
          this.getUser();
          this.getloadDashboardData();
          this.LoadSimilarProperty();
        }, 1000);
      }
    });
  }
  SpSliderOptions: OwlOptions = {
    loop: false,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: false,
    pullDrag: true,
    dots: true,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
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
        items: 3
      }
    },
    nav: true
  } 

  scrollfix: boolean= false;
  ngAfterViewInit(): void {
    $(window).on("scroll", () => {
      let a:any = $(".similer-properties-sec").offset()?.top;
      let windowHeight:any = $(window).outerHeight();
      let position:any = a - windowHeight;
      let temp: any=$(window).scrollTop();
      if(temp >= 1030 && temp < position){
        this.scrollfix= true;
      }
      else{
        this.scrollfix= false;
      }
    });
  }
}
