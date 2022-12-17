import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../service/app.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { ChartOptions } from "chart.js";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "../../service/auth.service";
import { environment } from 'src/environments/environment';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DecimalPipe } from '@angular/common';
import 'hammerjs';
import { MapStyle } from 'src/app/shared/map.retro.style';


declare const google: any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
  providers: [DecimalPipe]
})
export class PropertyDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('propertyDetails__map') mapElement: any;
  detailSuccess = false;
  showLoader:boolean = false;
  showMore:boolean=true;
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
  userPhoneNumber:string="";
  userWhatsAppNumber:string="";
  whatsAppShareUrl:any="";
  facebookShareUrl:any="";
  twitterShareUrl:any="";
  baseUrl = environment.apiUrl;
  status: boolean = true;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  shareURL: any = "";
  propertyValidationData: any = "";
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
  userData: any = "";
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  chartLabel: any = []
  chartData: any = []
  propertyDetails: any = [];


  public lineChartData: any = {
    labels: this.chartLabel,
    datasets: [
      {
        data: this.chartData,
        label: '',
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

  constructor(private decimalPipe: DecimalPipe,private datePipe:DatePipe, private location: Location, private authService: AuthService, private domSanitizer: DomSanitizer, private activeRoute: ActivatedRoute, private modalService: NgbModal, private service: AppService, private route: Router, private notifyService: NotificationService) {
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
  scrollfix: boolean = false;
  ngAfterViewInit(): void {
    $(window).on("scroll", () => {
      let a: any = $(".similer-properties-sec").offset()?.top;
      let windowHeight: any = $(window).outerHeight();
      let position: any = a - windowHeight;
      let temp: any = $(window).scrollTop();
      if (temp >= 1030 && temp < position) {
        this.scrollfix = true;
      }
      else {
        this.scrollfix = false;
      }
    });
  }
  goBack() {
    this.location.back();
  }
  openVerticallyCentered(sharemodal: any) {
    this.modalService.open(sharemodal, { centered: true });
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


  }
  propertyDetailData: any = {}
  documentCheck: any = true;
  allData: any = "";
  getloadDashboardData() {
    this.showLoader = true;
    this.detailSuccess = true;
    this.service.DisplayPropertyListing({ "PropertyListingId": this.propertyId, "LoginUserId": this.userId }).subscribe((result: any) => {
      console.log(result)
      if (result.result == 1) {

      this.propertyDetails = result.data.propertyListing;
      this.allData = result.data;
      let temp: any = result;
      this.shareURL += "detail?id="+this.propertyDetails.id;
      this.userData = temp.data.user;
      this.userPhoneNumber="tel:"+this.userData.phoneNumber;
      this.userWhatsAppNumber="https://wa.me/"+this.userData.phoneNumber?.replace("+","");
      this.whatsAppShareUrl=this.domSanitizer.bypassSecurityTrustUrl("https://wa.me/?text="+this.shareURL);
      this.facebookShareUrl=this.domSanitizer.bypassSecurityTrustUrl("https://www.facebook.com/sharer/sharer.php?u="+this.shareURL+"%3Futm_source%3Dfacebook%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
      this.twitterShareUrl=this.domSanitizer.bypassSecurityTrustUrl("https://twitter.com/intent/tweet?url="+this.shareURL+"%3Futm_source%3Dtwitter%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
      this.propertyLat = temp.data.propertyListing.propertyLat;
      this.propertyLng = temp.data.propertyListing.propertyLong;
      this.buildingName = temp.data.propertyListing.buildingName;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.propertyDetail = jsonParsDate

        //gallery images
        for (let i = 0; i < this.propertyDetails.documents.length; i++) {
          this.galleryImages.push({
            small: this.baseUrl + this.propertyDetails.documents[i].fileUrl.replaceAll("\\", "/"),
            medium: this.baseUrl + this.propertyDetails.documents[i].fileUrl.replaceAll("\\", "/"),
            big: this.baseUrl + this.propertyDetails.documents[i].fileUrl.replaceAll("\\", "/")
          });
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { "lat": parseFloat(this.propertyLat), "lng": parseFloat(this.propertyLng) },
          zoom: 16,
          disableDefaultUI: true,
        });
        this.map.setOptions({ styles: MapStyle.retro});
        let marker = new google.maps.Marker({
          position: { "lat": parseFloat(this.propertyLat), "lng": parseFloat(this.propertyLng) },
          map: this.map,
          label: {
            className: 'map-marker-label',
            text: this.buildingName == "" ? "Location" : this.buildingName
          },
        });

        let professionType: any = '';
        if (jsonParsDate.propertyListing.professionalType !== null && jsonParsDate.propertyListing.professionalType?.name !== null && jsonParsDate.propertyListing.professionalType?.name !== undefined) {
          professionType = jsonParsDate.propertyListing.professionalType.name
        }
        let companyName: any = '';
        if (this.allData?.agentDetails?.company !== null && this.allData?.agentDetails?.company !== undefined) {
          companyName = this.allData?.agentDetails?.company.companyName
        }
        let reraNo: any = '';
        if (this.allData?.agentDetails?.company !== null && this.allData?.agentDetails?.company !== undefined) {
          reraNo = this.allData?.agentDetails?.company.reraNo
        }
        let permitNo: any = '';
        if (this.allData?.agentDetails?.company !== null && this.allData?.agentDetails?.company !== undefined) {
          permitNo = this.allData?.agentDetails?.company.premitNo
        }

        let occupancyStatus: any = '';
        if (jsonParsDate.propertyListing.occupancyStatus !== null && jsonParsDate.propertyListing.occupancyStatus?.name !== null && jsonParsDate.propertyListing.occupancyStatus?.name !== undefined) {
          occupancyStatus = jsonParsDate.propertyListing.occupancyStatus.name
        }
        let completionStatus: any = '';
        if (jsonParsDate.propertyListing.propertyCompletionStatus !== null && jsonParsDate.propertyListing.propertyCompletionStatus?.statusDescription !== null && jsonParsDate.propertyListing.propertyCompletionStatus?.statusDescription !== undefined) {
          completionStatus = jsonParsDate.propertyListing.propertyCompletionStatus.statusDescription
        }
        let propertyDeveloper: any = '';
        if (jsonParsDate.propertyListing.propertyDeveloper !== null && jsonParsDate.propertyListing.propertyDeveloper?.name !== null && jsonParsDate.propertyListing.propertyDeveloper?.name !== undefined) {
          propertyDeveloper = jsonParsDate.propertyListing.propertyDeveloper.name
        }
        let transactionType: any = '';
        if (jsonParsDate.propertyListing.propertyTransactionType !== null && jsonParsDate.propertyListing.propertyTransactionType?.name !== null && jsonParsDate.propertyListing.propertyTransactionType?.name !== undefined) {
          transactionType = jsonParsDate.propertyListing.propertyTransactionType.name
        }
        let rentType: any = '';
        if (jsonParsDate.propertyListing.rentType !== null && jsonParsDate.propertyListing.rentType?.name !== null && jsonParsDate.propertyListing.rentType?.name !== undefined && jsonParsDate.propertyListing.propertyListingTypeId != 2) {
          rentType = jsonParsDate.propertyListing.rentType.name
        }
       let companyLogoImage:any='';
       if(this.allData?.agentDetails?.company!=null && this.allData?.agentDetails?.company?.documents.length>0){
        let companyLogo =this.allData?.agentDetails?.company?.documents.find((y: any) => {
          return y.registrationDocumentTypeId === 8
        })
        if (companyLogo != null && companyLogo != undefined) {
          companyLogoImage = this.baseUrl + companyLogo.fileUrl;
        }
       }
        if (jsonParsDate.propertyListing != null) {
          this.propertyDetailData.propertyPrice = (jsonParsDate.propertyListing.propertyPrice !== undefined) ? jsonParsDate.propertyListing.propertyPrice : ''
          this.propertyDetailData.currency = (jsonParsDate.propertyListing.country.currency !== undefined) ? jsonParsDate.propertyListing.country.currency : ''
          this.propertyDetailData.rentType = rentType
          this.propertyDetailData.securityDeposit = (jsonParsDate.propertyListing.securityDeposit !== undefined) ? jsonParsDate.propertyListing.securityDeposit : false
          this.propertyDetailData.securityDepositPrice = (jsonParsDate.propertyListing.securityDepositPrice !== undefined) ? jsonParsDate.propertyListing.securityDepositPrice : ''
          this.propertyDetailData.brokerageCharge = (jsonParsDate.propertyListing.brokerageCharge !== undefined) ? jsonParsDate.propertyListing.brokerageCharge : false
          this.propertyDetailData.brokerageChargePrice = (jsonParsDate.propertyListing.brokerageChargePrice !== undefined) ? jsonParsDate.propertyListing.brokerageChargePrice : ''
          this.propertyDetailData.buildingName = (jsonParsDate.propertyListing.buildingName !== undefined) ? jsonParsDate.propertyListing.buildingName : ''
          this.propertyDetailData.documents = (jsonParsDate.propertyListing.documents !== undefined) ? jsonParsDate.propertyListing.documents : []
          this.propertyDetailData.propertyAddress = (jsonParsDate.propertyListing.propertyAddress !== undefined) ? jsonParsDate.propertyListing.propertyAddress : ''
          this.propertyDetailData.bedrooms = (jsonParsDate.propertyListing.bedrooms !== undefined) ? jsonParsDate.propertyListing.bedrooms : ''
          this.propertyDetailData.bathrooms = (jsonParsDate.propertyListing.bathrooms !== undefined) ? jsonParsDate.propertyListing.bathrooms : ''
          this.propertyDetailData.carpetArea = (jsonParsDate.propertyListing.carpetArea !== undefined) ? jsonParsDate.propertyListing.carpetArea : ''
          this.propertyDetailData.unitType = (jsonParsDate.propertyListing.country.unitType !== undefined) ? jsonParsDate.propertyListing.country.unitType : ''
          this.propertyDetailData.furnishingType = (jsonParsDate.propertyListing.furnishingType !== undefined) ? jsonParsDate.propertyListing.furnishingType : ''
          this.propertyDetailData.propertyDescription = (jsonParsDate.propertyListing.propertyDescription !== undefined) ? jsonParsDate.propertyListing.propertyDescription : ''
          this.propertyDetailData.propertyFeatures = (jsonParsDate.propertyListing.propertyFeatures !== undefined) ? jsonParsDate.propertyListing.propertyFeatures : ''
          this.propertyDetailData.requestedDateFormat = (jsonParsDate.propertyListing.requestedDateFormat !== undefined) ? jsonParsDate.propertyListing.requestedDateFormat : ''
          this.propertyDetailData.buildingType = (jsonParsDate.propertyListing.propertyCategory.categoryName !== undefined) ? jsonParsDate.propertyListing.propertyCategory.categoryName : ''
          this.propertyDetailData.propertyType = (jsonParsDate.propertyListing.propertyType.typeDescription !== undefined) ? jsonParsDate.propertyListing.propertyType.typeDescription : ''
          this.propertyDetailData.buildingName = (jsonParsDate.propertyListing.buildingName !== undefined) ? jsonParsDate.propertyListing.buildingName : ''
          this.propertyDetailData.unitNo = jsonParsDate.propertyListing.unitNumber ? jsonParsDate.propertyListing.unitNumber : ''
          this.propertyDetailData.fittingType = (jsonParsDate.propertyListing.fittingType !== undefined) ? jsonParsDate.propertyListing.fittingType : ''
          //this.propertyDetailData.tenantType = tenantType
          // this.propertyDetailData.gender = (jsonParsDate.propertyListing.gender !== undefined) ? jsonParsDate.propertyListing.gender : ''
          this.propertyDetailData.parkings = (jsonParsDate.propertyListing.parkings !== undefined) ? jsonParsDate.propertyListing.parkings : ''
          this.propertyDetailData.buildupArea = (jsonParsDate.propertyListing.buildupArea !== undefined) ? jsonParsDate.propertyListing.buildupArea : ''
          this.propertyDetailData.plotSize = (jsonParsDate.propertyListing.plotSize !== undefined) ? jsonParsDate.propertyListing.plotSize : ''
          // this.propertyDetailData.availableDate = (jsonParsDate.propertyListing.availableDate !== undefined) ? jsonParsDate.propertyListing.availableDate : ''
          // this.propertyDetailData.noticePeriod = (jsonParsDate.propertyListing.noticePeriod !== undefined) ? jsonParsDate.propertyListing.noticePeriod : ''
          // this.propertyDetailData.lockingPeriod = (jsonParsDate.propertyListing.lockingPeriod !== undefined) ? jsonParsDate.propertyListing.lockingPeriod : ''
          this.propertyDetailData.propertyLat = (jsonParsDate.propertyListing.propertyLat !== undefined) ? jsonParsDate.propertyListing.propertyLat : ''
          this.propertyDetailData.propertyLong = (jsonParsDate.propertyListing.propertyLong !== undefined) ? jsonParsDate.propertyListing.propertyLong : ''
          this.propertyDetailData.id = (jsonParsDate.propertyListing.id !== undefined) ? jsonParsDate.propertyListing.id : ''
          this.propertyDetailData.favorite = (jsonParsDate.propertyListing.favorite !== undefined) ? jsonParsDate.propertyListing.favorite : ''
          this.propertyDetailData.propertyListingTypeId = (jsonParsDate.propertyListing.propertyListingTypeId !== undefined) ? jsonParsDate.propertyListing.propertyListingTypeId : 0
          this.propertyDetailData.propertyCode = (jsonParsDate.propertyListing.propertyCode !== undefined) ? jsonParsDate.propertyListing.propertyCode : 0
          this.propertyDetailData.occupancyStatus = occupancyStatus;
          this.propertyDetailData.completionStatus = completionStatus;
          this.propertyDetailData.propertyDeveloper = propertyDeveloper;
          this.propertyDetailData.transactionType = transactionType;
          this.propertyDetailData.angentId = (jsonParsDate.propertyListing.userId == undefined || jsonParsDate.propertyListing.userId == null) ? 0 : Math.abs(jsonParsDate.propertyListing.userId);
          this.propertyDetailData.priceChangePercentage = (jsonParsDate.propertyListing.priceChangePercentage == undefined || jsonParsDate.propertyListing.priceChangePercentage == null) ? 0 : Math.abs(jsonParsDate.propertyListing.priceChangePercentage);
          this.propertyDetailData.sizeChangePercentage = (jsonParsDate.propertyListing.sizeChangePercentage == undefined || jsonParsDate.propertyListing.sizeChangePercentage == null) ? 0 : Math.abs(jsonParsDate.propertyListing.sizeChangePercentage);
          this.propertyDetailData.rentAvgPriceSqft = (jsonParsDate.propertyListing.rentAvgPriceSqft == undefined || jsonParsDate.propertyListing.rentAvgPriceSqft == null) ? 0 : jsonParsDate.propertyListing.rentAvgPriceSqft;
          this.propertyDetailData.saleAvgPriceSqft = (jsonParsDate.propertyListing.saleAvgPriceSqft == undefined || jsonParsDate.propertyListing.saleAvgPriceSqft == null) ? 0 : jsonParsDate.propertyListing.saleAvgPriceSqft;
          this.propertyDetailData.averageSize = (jsonParsDate.propertyListing.averageSize == undefined || jsonParsDate.propertyListing.averageSize == null) ? 0 : jsonParsDate.propertyListing.averageSize;
          this.propertyDetailData.propertyListingLocatedNears = (jsonParsDate.propertyListing.propertyListingLocatedNears == undefined || jsonParsDate.propertyListing.propertyListingLocatedNears == null) ? [] : jsonParsDate.propertyListing.propertyListingLocatedNears;
          this.propertyDetailData.location = jsonParsDate.propertyListing.district.name + ", " + jsonParsDate.propertyListing.city.name;
          this.propertyDetailData.city = jsonParsDate.propertyListing.city.name;
          this.propertyDetailData.activeListingCount = jsonParsDate.activeListingCount;
          this.propertyDetailData.professionType = professionType;
          this.propertyDetailData.companyName = companyName;
          this.propertyDetailData.reraNo = reraNo;
          this.propertyDetailData.permitNo = permitNo;
          this.propertyDetailData.companyLogoImage = companyLogoImage;
          this.propertyDetailData.startDate =  (jsonParsDate.propertyListing.startDate == undefined || jsonParsDate.propertyListing.startDate == null) ? '' : jsonParsDate.propertyListing.startDate;
          this.propertyDetailData.endDate =  (jsonParsDate.propertyListing.endDate == undefined || jsonParsDate.propertyListing.endDate == null) ? '' : jsonParsDate.propertyListing.endDate;

          // share url concatination
          // let ree = "https://maps.google.com/maps?q=" + this.propertyDetailData.propertyLat + "," + this.propertyDetailData.propertyLong + "&hl=es&z=14&amp;output=embed"
          // let resp: any = this.domSanitizer.bypassSecurityTrustUrl(ree);
          // this.locationAddress1 = resp


          // if (this.propertyDetail.propertyListing.documents.length == 0) {
          //   this.documentCheck = false;
          // }

          // if (this.propertyDetail.propertyListing.documents[0].fileUrl != null && this.propertyDetail.propertyListing.documents[0].fileUrl !== undefined) {
          //   this.thumb1 = this.baseUrl + this.propertyDetail.propertyListing.documents[0].fileUrl;
          // }

          if (jsonParsDate.detailsChart != null) {
            jsonParsDate.detailsChart.chart.forEach((element: any, i: any) => {
              let date: any = element.date
              let price: any = element.price
              this.chartLabel.push(date);
              this.chartData.push(price);
            })
          }

          this.propertyValidationData = result.data.propertyListing?.propertyType;
          this.getPropertyInfo();

        } else {
          //if property not found redirect home page
          this.notifyService.showError('Property No found!', "");
          this.route.navigate(['/'])
          ///end
        }
        if (jsonParsDate.user != null && jsonParsDate.user != undefined && jsonParsDate.user?.imageUrl != null) {
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
              label: 'Price',
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
        this.showLoader = false;
      }
      else {
        this.showLoader = false;
        this.detailSuccess = false;
      }
    });

  }
  getPropertyInfo() {
    this.propertyinfo = [
      {
        show: true,
        label: 'Listed on',
        value: this.propertyDetailData.requestedDateFormat,
      },
      {
        show: true,
        label: 'OV-Verified On',
        value: this.propertyDetailData.requestedDateFormat,
      },
      {
        show: true,
        label: 'Property Category',
        value: this.propertyDetailData.buildingType,
      },
      {
        show: true,
        label: 'Property Type',
        value: this.propertyDetailData.propertyType,
      },
      {
        show: this.propertyValidationData.hasListingBed,
        label: 'Bedroom',
        value: this.propertyDetailData.bedrooms,
      },
      {
        show: this.propertyValidationData.hasListingBath,
        label: 'Bathroom',
        value: this.propertyDetailData.bathrooms,
      },
      {
        show: this.propertyValidationData.hasListingFurnishing,
        label: 'Furnishing Type',
        value: this.propertyDetailData.furnishingType,
      },
      {
        show: this.propertyValidationData.hasListingFitting,
        label: 'Fitting Type',
        value: this.propertyDetailData.fittingType,
      },
      {
        show: this.propertyValidationData.hasListingParking,
        label: 'Available Parking',
        value: this.propertyDetailData.parkings==null || this.propertyDetailData.parkings==undefined || this.propertyDetailData.parkings==0?"N/A":this.propertyDetailData.parkings,
      },
      {
        show: this.propertyValidationData.hasListingUnitNumber,
        label: 'No Of Units',
        value: this.propertyDetailData.unitNo,
      },
      {
        label: 'Carpet Area',
        show: this.propertyValidationData.hasListingCarpetArea,
        value: this.decimalPipe.transform(this.propertyDetailData.carpetArea),
      },
      {
        show: this.propertyValidationData.hasListingPlotSize,
        label: this.propertyValidationData.sizeLabel,
        value: this.decimalPipe.transform(this.propertyDetailData.plotSize),
      },
      {
        show: this.propertyValidationData.hasListingBuildUpArea,
        label: 'Build-up Area',
        value: this.decimalPipe.transform(this.propertyDetailData.buildupArea),
      },
      {
        show: this.propertyDetailData.propertyListingTypeId == 2 && this.propertyValidationData.hasListingOccupancyStatus ? true : false,
        label: 'Current Occupancy Status',
        value: this.propertyDetailData.occupancyStatus,
      },
      {
        show: this.propertyValidationData.hasListingCompletionStatus ? true : false,
        label: 'Completion Status',
        value: this.propertyDetailData.completionStatus,
      },
      {
        show: this.propertyValidationData.hasListingTransactionType ? true : false,
        label: 'Transaction Type',
        value: this.propertyDetailData.transactionType,
      },
      {
        show: this.propertyValidationData.hasListingDeveloper ? true : false,
        label: 'Developer',
        value: this.propertyDetailData.propertyDeveloper,
      },
      {
        show: true,
        label: 'Price',
        value: this.decimalPipe.transform(this.propertyDetailData.propertyPrice) + ' ' + this.propertyDetailData.currency,
      },
      {
        show: this.propertyDetailData.propertyListingTypeId == 2 ? true : false,
        label: 'Rent Type',
        value: this.propertyDetailData.rentType,
      },
      {
        show: this.propertyDetailData.securityDeposit,
        label: 'Security Deposit',
        value: this.decimalPipe.transform(this.propertyDetailData.securityDepositPrice) + ' ' + this.propertyDetailData.currency,
      },
      {
        show: this.propertyDetailData.brokerageCharge,
        label: 'Brokerage Deposit',
        value: this.decimalPipe.transform(this.propertyDetailData.brokerageChargePrice) + ' ' + this.propertyDetailData.currency,
      },
      {
        show: this.propertyDetailData.rentType.trim()=='Short Term'?true:false,
        label: 'Rent Start Date',
        value: this.datePipe.transform(this.propertyDetailData.startDate,'mediumDate'),
      },
      {
        show: this.propertyDetailData.rentType.trim()=='Short Term'?true:false,
        label: 'Rent End Date',
        value: this.datePipe.transform(this.propertyDetailData.endDate,'mediumDate'),
      }
    ]

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
      response.data.forEach((element: any, i: any) => {
        let image = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        }

        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: element.rentType?.name,
            currency: element.country.currency,
            favorite: element.favorite,
            propertyAddress: element.propertyAddress,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
            buildupArea: element.buildupArea,
          });
      })
    });
    this.similarPropertyDetails = tempData
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
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

}
