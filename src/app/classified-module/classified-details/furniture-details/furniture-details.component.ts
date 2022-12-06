import { Component, OnInit } from '@angular/core';
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
import 'hammerjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';


declare const google: any;

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.scss']
})
export class FurnitureDetailsComponent implements OnInit {
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
  twitter = '../../../assets/images/icons/twiiter-share.svg'
  qr = '../../../assets/images/icons/qr-share.svg'
  fb = '../../../assets/images/icons/fb-share.svg'
  tagicn = '../../../assets/images/icons/tag-icn.svg'
  homeLoc = '../../../assets/images/home-location.svg'
  user: any
  baseUrl = 'https://beta.ovaluate.com/'
  status: boolean = false;
  status1: boolean = false;
  status2: boolean = true;
  status3: boolean = false;
  status4: boolean = false;
  shareURL: any = "";
  propertyValidationData: any = "";
  keyhighlight() {
    this.status = !this.status;
    this.status1 = false;
    this.status2 = false;
    this.status3 = false;
  }
  Location() {
    this.status = false;
    this.status1 = !this.status1;
    this.status2 = false;
    this.status3 = false;
  }
  overview() {
    this.status = false;
    this.status2 = !this.status2;
    this.status1 = false;
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
  propertyinfo: any = [];
  closeResult: string = "";
  propertyDetail: any;
  districtDetail: any = {};
  dataLoaded: boolean = false;
  propertyId: any;
  userId: any;
  propertyLat: number = 0;
  propertyLng: number = 0;
  buildingName: any;
  map: any;
  bounds: any = [];
  id: number = 1;
  userData: any = "";
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }


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

    this.galleryImages = [
      {
        small: 'assets/images/furniture/furniture.jpg',
        medium: 'assets/images/furniture/furniture.jpg',
        big: 'assets/images/furniture/furniture.jpg'
      },
      {
        small: 'assets/images/furniture/furniture.jpg',
        medium: 'assets/images/furniture/furniture.jpg',
        big: 'assets/images/furniture/furniture.jpg'
      },
      {
        small: 'assets/images/furniture/furniture.jpg',
        medium: 'assets/images/furniture/furniture.jpg',
        big: 'assets/images/furniture/furniture.jpg'
      }
    ];
  }


  isload: any = false
  propertyDetailData: any = {}

  documentCheck: any = true
  getloadDashboardData() {
    return this.service.DisplayPropertyListing({ "PropertyListingId": this.propertyId, "LoginUserId": this.userId }).subscribe((e: any) => {
      let temp: any = e;
      this.userData = temp.data.user;
      this.propertyLat = temp.data.propertyListing.propertyLat;
      this.propertyLng = temp.data.propertyListing.propertyLong;
      this.buildingName = temp.data.propertyListing.buildingName;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.propertyDetail = jsonParsDate
      this.isload = true

      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'property-near-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.propertyLng, this.propertyLat],
        zoom: 11,
      })
      let marker = new mapboxgl.Marker({ color: "#FF0000", draggable: false }).setLngLat([this.propertyLng, this.propertyLat]).addTo(this.map).setPopup(
        new mapboxgl.Popup({ offset: 25, focusAfterOpen: false }) // add popups
          .setHTML(this.buildingName)
      ).togglePopup();

    });
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

  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
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
    nav: true
  }
  CarsList = [
    {
      src: '/assets/images/furniture/furniture1.jpeg',
      price: '5,657',
      PropertyName: 'Table Furniture',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers',
    },
    {
      src: '/assets/images/furniture/furniture2.jpeg',
      price: '6,098',
      PropertyName: 'Garden Furniture',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers',
    },
    {
      src: '/assets/images/furniture/furniture3.jpeg',
      price: '2,000',
      PropertyName: 'Furniture',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '/assets/images/furniture/furniture4.jpeg',
      price: '8,657',
      PropertyName: 'Furniture',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers',
    },
    {
      src: '/assets/images/furniture/furniture3.jpeg',
      price: '69,098',
      PropertyName: 'Furniture',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers',
    },
    {
      src: '/assets/images/furniture/furniture2.jpeg',
      price: '42,000',
      PropertyName: 'Ferrari SF90',
      link: '',
      address: 'Furniture',
    },
  ]
}
