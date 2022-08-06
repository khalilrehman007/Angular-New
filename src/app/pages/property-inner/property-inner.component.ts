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
  propertyinfo :any = [];
  closeResult: string;
  propertyDetail :any;
  propertyId :any;

  constructor(private activeRoute: ActivatedRoute,private modalService: NgbModal,private service:AppService,private route:Router,private notifyService : NotificationService) {
    this.propertyId = this.activeRoute.snapshot.queryParamMap.get('id');
    this.getUser();
    this.getloadDashboardData();
    this.LoadSimilarProperty();
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

      // console.log(jsonParsDate.propertyListing.rentType,'dededededed')
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
        this.propertyDetailData.furnishingType = (jsonParsDate.propertyListing.furnishingType !== undefined) ? jsonParsDate.propertyListing.furnishingType : ''
        this.propertyDetailData.fittingType = (jsonParsDate.propertyListing.fittingType !== undefined) ? jsonParsDate.propertyListing.fittingType : ''
        this.propertyDetailData.tenantType = (jsonParsDate.propertyListing.tenantType.name !== undefined) ? jsonParsDate.propertyListing.tenantType.name : ''
        this.propertyDetailData.gender = (jsonParsDate.propertyListing.gender !== undefined) ? jsonParsDate.propertyListing.gender : ''
        this.propertyDetailData.parkings = (jsonParsDate.propertyListing.parkings !== undefined) ? jsonParsDate.propertyListing.parkings : ''
        this.propertyDetailData.carpetArea = (jsonParsDate.propertyListing.carpetArea !== undefined) ? jsonParsDate.propertyListing.carpetArea : ''
        this.propertyDetailData.buildupArea = (jsonParsDate.propertyListing.buildupArea !== undefined) ? jsonParsDate.propertyListing.buildupArea : ''
        this.propertyDetailData.occupancyStatus = (jsonParsDate.propertyListing.occupancyStatus.name !== undefined) ? jsonParsDate.propertyListing.occupancyStatus.name : ''
        this.propertyDetailData.propertyManage = (jsonParsDate.propertyListing.propertyManage.name !== undefined) ? jsonParsDate.propertyListing.propertyManage.name : ''
        this.propertyDetailData.rentType = (jsonParsDate.propertyListing.rentType !== undefined) ? jsonParsDate.propertyListing.rentType : ''
        this.propertyDetailData.securityDepositPrice = (jsonParsDate.propertyListing.securityDepositPrice !== undefined) ? jsonParsDate.propertyListing.securityDepositPrice : ''
        this.propertyDetailData.brokerageChargePrice = (jsonParsDate.propertyListing.brokerageChargePrice !== undefined) ? jsonParsDate.propertyListing.brokerageChargePrice : ''
        this.propertyDetailData.availableDate = (jsonParsDate.propertyListing.availableDate !== undefined) ? jsonParsDate.propertyListing.availableDate : ''
        this.propertyDetailData.noticePeriod = (jsonParsDate.propertyListing.noticePeriod !== undefined) ? jsonParsDate.propertyListing.noticePeriod : ''
        this.propertyDetailData.lockingPeriod = (jsonParsDate.propertyListing.lockingPeriod !== undefined) ? jsonParsDate.propertyListing.lockingPeriod : ''

        if(this.propertyDetail.propertyListing.documents[0].fileUrl != null){
          this.thumb1 = this.baseUrl+this.propertyDetail.propertyListing.documents[0].fileUrl;
        }
        if(this.propertyDetail.propertyListing.documents[1].fileUrl != null){
          this.thumb1 = this.baseUrl+this.propertyDetail.propertyListing.documents[1].fileUrl;
        }
        this.getPropertyInfo();

      }else{

        //if property not found redirect home page
        this.notifyService.showError('Property No found!', "");
        this.route.navigate(['/'])

        ///end
      }

      if(jsonParsDate.user != null){
        this.propertyDetailData.userImageUrl = (jsonParsDate.user.imageUrl !== undefined) ? jsonParsDate.user.imageUrl : ''
        this.propertyDetailData.userfullName = (jsonParsDate.user.fullName !== undefined) ? jsonParsDate.user.fullName : ''
      }else{
        this.propertyDetailData.userImageUrl = ''
        this.propertyDetailData.userfullName = ''
      }

    });
  }


  getPropertyInfo(){

    this.propertyinfo = [
      {
        label: 'Listed on',
        value:'empty',
      },
      {
        label: 'OV-Verified On',
        value:this.propertyDetailData.requestedDateFormat,
      },
      {
        label: 'Building Type',
        value:this.propertyDetailData.buildingType,
      },
      {
        label: 'Property Type',
        value:this.propertyDetailData.propertyType,
      },
      {
        label: 'Tower No. / Building Name',
        value:this.propertyDetailData.buildingName,
      },
      {
        label: 'Total Floors in Building',
        value:this.propertyDetailData.totalFloor,
      },
      {
        label: 'Floor No.',
        value:this.propertyDetailData.floorNo,
      },
      {
        label: 'Unit No.',
        value:this.propertyDetailData.unitNo,
      },
      {
        label: 'Bedroom',
        value:this.propertyDetailData.bedrooms,
      },
      {
        label: 'Bathroom',
        value:this.propertyDetailData.bathrooms,
      },
      {
        label: 'Furnishing Type',
        value:this.propertyDetailData.furnishingType,
      },
      {
        label: 'Fitting Type',
        value:this.propertyDetailData.fittingType,
      },
      {
        label: 'Preferred Tenant Type',
        value:this.propertyDetailData.tenantType,
      },
      {
        label: 'Preferred Gender Type',
        value:this.propertyDetailData.gender,
      },
      {
        label: 'Available Parking',
        value:this.propertyDetailData.parkings,
      },
      {
        label: 'Pet Policy',
        value:'empty',
      },
      {
        label: 'Carpet Area',
        value:this.propertyDetailData.carpetArea,
      },
      {
        label: 'Build-up Area',
        value:this.propertyDetailData.buildupArea,
      },
      {
        label: 'Current Occupancy Status',
        value:this.propertyDetailData.occupancyStatus,
      },
      {
        label: 'Property Managed by',
        value:this.propertyDetailData.propertyManage,
      },
      {
        label: 'Price',
        value:this.propertyDetailData.propertyPrice,
      },
      {
        label: 'Rent Type',
        value:this.propertyDetailData.propertyPrice,
      },
      {
        label: 'Security Deposit',
        value:this.propertyDetailData.securityDepositPrice,
      },
      {
        label: 'Brokerage Deposit',
        value:this.propertyDetailData.brokerageChargePrice,
      },
      {
        label: 'Available From',
        value:this.propertyDetailData.availableDate,
      },
      {
        label: 'Notice Period',
        value:this.propertyDetailData.noticePeriod,
      },
      {
        label: 'Locking Period',
        value:this.propertyDetailData.lockingPeriod,
      },
    ]

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

  similarPropertyDetails:any=[]
  LoadSimilarProperty() {
    let tempData :Array<Object> = []
    this.service.LoadSimilarProperty(32).subscribe(data=>{
      this.similarPropertyDetails= data;
      this.similarPropertyDetails = this.similarPropertyDetails.data;
      this.similarPropertyDetails.forEach((element, i) => {
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
    this.similarPropertyDetails = tempData
    console.log(this.similarPropertyDetails,'dedededede')
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
