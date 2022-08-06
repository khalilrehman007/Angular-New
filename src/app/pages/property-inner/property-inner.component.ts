import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../service/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";


@Component({
  selector: 'app-property-inner',
  templateUrl: './property-inner.component.html',
  styleUrls: ['./property-inner.component.scss']
})
export class PropertyInnerComponent implements OnInit {
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
  user : any
  baseUrl = 'https://beta.ovaluate.com/'

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
  dynamicSlides1 = [
    {
      id: 'slide1',
      src:'assets/images/property/1.png',
      alt:'Side 1',
      title:'Side 1',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide2',
      src:'assets/images/property/1.png',
      alt:'Side 2',
      title:'Side 2',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide3',
      src:'assets/images/property/1.png',
      alt:'Side 3',
      title:'Side 3',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide4',
      src:'assets/images/property/1.png',
      alt:'Side 4',
      title:'Side 4',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    }
  ]
  propertyinfo = [
    {
      label: 'Listed on',
      value:'7 Days Ago',
    },
    {
      label: 'OV-Verified On',
      value:'24 Apr 2022',
    },
    {
      label: 'Building Type',
      value:'Residential',
    },
    {
      label: 'Property Type',
      value:'Apartment',
    },
    {
      label: 'Tower No. / Building Name',
      value:'Blue Wave Tower',
    },
    {
      label: 'Total Floors in Building',
      value:'12',
    },
    {
      label: 'Floor No.',
      value:'10',
    },
    {
      label: 'Unit No.',
      value:'Not Mentioned',
    },
    {
      label: 'Bedroom',
      value:'5 BHK',
    },
    {
      label: 'Bathroom',
      value:'3',
    },
    {
      label: 'Furnishing Type',
      value:'Furnished',
    },
    {
      label: 'Fitting Type',
      value:'Shell & Core',
    },
    {
      label: 'Preferred Tenant Type',
      value:'Family',
    },
    {
      label: 'Preferred Gender Type',
      value:'Any',
    },
    {
      label: 'Available Parking',
      value:'0',
    },
    {
      label: 'Pet Policy',
      value:'No Pets Allowed',
    },
    {
      label: 'Carpet Area',
      value:'3,678 Sq. Ft.',
    },
    {
      label: 'Build-up Area',
      value:'455 Sq. Mt.',
    },
    {
      label: 'Current Occupancy Status',
      value:'Occupied',
    },
    {
      label: 'Property Managed by',
      value:'Landlord',
    },
    {
      label: 'Price',
      value:'85,000 AED',
    },
    {
      label: 'Rent Type',
      value:'Yearly',
    },
    {
      label: 'Security Deposit',
      value:'1000 AED',
    },
    {
      label: 'Brokerage Deposit',
      value:'500 AED',
    },
    {
      label: 'Available From',
      value:'01 July, 2022',
    },
    {
      label: 'Notice Period',
      value:'30 Days',
    },
    {
      label: 'Locking Period',
      value:'03 Months',
    },
  ]
  closeResult: string;
  propertyDetail :any;
  propertyId :any;

  constructor(private activeRoute: ActivatedRoute,private modalService: NgbModal,private service:AppService,private route:Router,private notifyService : NotificationService) {
    this.propertyId = this.activeRoute.snapshot.queryParamMap.get('id');
    this.getUser();
    this.getloadDashboardData();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {

  }

  isload :any= false
  propertyDetailData :any = {}
  getloadDashboardData() {
    this.service.DisplayPropertyListing(this.propertyId).subscribe(e => {
      let temp: any = e;
      let jsonData :any = JSON.stringify(temp.data)
      let jsonParsDate :any = JSON.parse(jsonData);
      this.propertyDetail = jsonParsDate
      this.isload = true

      if(jsonParsDate.propertyListing != null){
        this.propertyDetailData.propertyPrice = (jsonParsDate.propertyListing.propertyPrice !== undefined) ? jsonParsDate.propertyListing.propertyPrice : ''
        this.propertyDetailData.currency = (jsonParsDate.propertyListing.country.currency !== undefined) ? jsonParsDate.propertyListing.country.currency : ''
        this.propertyDetailData.rentType = (jsonParsDate.propertyListing.rentType !== undefined) ? jsonParsDate.propertyListing.rentType : ''
        this.propertyDetailData.securityDepositPrice = (jsonParsDate.propertyListing.securityDepositPrice !== undefined) ? jsonParsDate.propertyListing.securityDepositPrice : ''
        this.propertyDetailData.brokerageChargePrice = (jsonParsDate.propertyListing.brokerageChargePrice !== undefined) ? jsonParsDate.propertyListing.brokerageChargePrice : ''
        this.propertyDetailData.buildingName = (jsonParsDate.propertyListing.buildingName !== undefined) ? jsonParsDate.propertyListing.buildingName : ''
        this.propertyDetailData.documents = (jsonParsDate.propertyListing.documents !== undefined) ? jsonParsDate.propertyListing.documents : ''
        this.propertyDetailData.propertyAddress = (jsonParsDate.propertyListing.propertyAddress !== undefined) ? jsonParsDate.propertyListing.propertyAddress : ''
        this.propertyDetailData.bedrooms = (jsonParsDate.propertyListing.bedrooms !== undefined) ? jsonParsDate.propertyListing.bedrooms : ''
        this.propertyDetailData.bathrooms = (jsonParsDate.propertyListing.bathrooms !== undefined) ? jsonParsDate.propertyListing.bathrooms : ''
        this.propertyDetailData.carpetArea = (jsonParsDate.propertyListing.carpetArea !== undefined) ? jsonParsDate.propertyListing.carpetArea : ''
        this.propertyDetailData.unitType = (jsonParsDate.propertyListing.country.unitType !== undefined) ? jsonParsDate.propertyListing.country.unitType : ''
        this.propertyDetailData.furnishingType = (jsonParsDate.propertyListing.propertyAddress !== undefined) ? jsonParsDate.propertyListing.propertyAddress : ''
        this.propertyDetailData.propertyDescription = (jsonParsDate.propertyListing.propertyDescription !== undefined) ? jsonParsDate.propertyListing.propertyDescription : ''
        // this.propertyDetailData.propertyDescription = (jsonParsDate.propertyListing.propertyDescription !== undefined) ? jsonParsDate.propertyListing.propertyDescription : ''

        if(this.propertyDetail.propertyListing.documents[0].fileUrl != null){
          this.thumb1 = this.baseUrl+this.propertyDetail.propertyListing.documents[0].fileUrl;
        }
        if(this.propertyDetail.propertyListing.documents[1].fileUrl != null){
          this.thumb1 = this.baseUrl+this.propertyDetail.propertyListing.documents[1].fileUrl;
        }
      }else{

        //if property not found redirect home page
        this.notifyService.showError('Property No found!', "");
        this.route.navigate(['/'])

        ///end
        this.propertyDetailData.propertyPrice = ''
        this.propertyDetailData.currency = ''
        this.propertyDetailData.rentType = ''
        this.propertyDetailData.securityDepositPrice = ''
        this.propertyDetailData.brokerageChargePrice = ''
        this.propertyDetailData.buildingName = ''
        this.propertyDetailData.documents = []
        this.propertyDetailData.propertyAddress = ''
        this.propertyDetailData.bedrooms = ''
        this.propertyDetailData.bathrooms = ''
        this.propertyDetailData.carpetArea = ''
        this.propertyDetailData.unitType = ''
        this.propertyDetailData.furnishingType = ''
        this.propertyDetailData.propertyDescription = ''
      }

      if(jsonParsDate.user != null){
        this.propertyDetailData.userImageUrl = (jsonParsDate.user.imageUrl !== undefined) ? jsonParsDate.user.imageUrl : ''
        this.propertyDetailData.userfullName = (jsonParsDate.user.fullName !== undefined) ? jsonParsDate.user.fullName : ''
      }else{
        this.propertyDetailData.userImageUrl = ''
        this.propertyDetailData.userfullName = ''
      }

      console.log(this.propertyDetailData,'deded')

    });
  }


  SubmitForm = new FormGroup({
    name : new FormControl("", Validators.required),
    email : new FormControl("", Validators.required),
    phone : new FormControl("", Validators.required),
    message : new FormControl("", Validators.required),
  });

  responsedata: any;
  leadData    : any = {};
  leadProceedStore(){
    if (this.SubmitForm.invalid) {
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

      this.service.StoreLead(this.leadData).subscribe(result => {
        if(result!=null){
          this.responsedata = result;
          if(this.responsedata.message == "User Lead  submitted successfully"){
            if(this.responsedata.data !== undefined && this.responsedata.error.length < 1){
              this.SubmitForm.controls.name.setValue('');
              this.SubmitForm.controls.email.setValue('');
              this.SubmitForm.controls.phone.setValue('');
              this.SubmitForm.controls.message.setValue('');

              this.notifyService.showSuccess(this.responsedata.message, "");
            }else{
              this.notifyService.showError(this.responsedata.error[0], "");
            }
          }
        }else{
          this.notifyService.showError("User Lead  submitted Failed", "");
        }
      });
    }

  }

  getUser(){
    this.user = localStorage.getItem('user');
    if(this.user != ''){
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Aug, 2022',
      'Sep, 2022',
      'Oct, 2022',
      'Nov, 2022',
      'Dec, 2022',
      'Jan, 2023',
      'Feb, 2023',
      'Mar, 2023',
      'April, 2023',
      'May, 2023',
      'June, 2023',
      'Jul, 2023'
    ],
    datasets: [
      {
        data: [ 0, 200000, 200000, 240000, 245000, 253000, 254000, 250000, 252000, 300000,290000,260000,350000],
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
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {  ticks: {
        maxRotation: 70,
        minRotation: 70,
     }},
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
}
