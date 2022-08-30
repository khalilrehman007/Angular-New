import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit {
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/icons/Bath-tub.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  furnishing = 'assets/images/icons/furnishing.svg'
  agentDetail: any = {};
  newAgentDetail: any = {};
  baseUrl = 'https://beta.ovaluate.com/'
  id: any;
  user: any;
  myListing: any = [];
  totalLength: number = 0;
  page: number = 1;
  constructor(private service: AppService, private route: ActivatedRoute,private notifyService : NotificationService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service.id = params['id'];
    })
    this.LoadPropertySortBy();

    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if (this.user != null) {
      this.service.DisplayAgent({ "PropertyListingId": "", "AgentUserId": this.id, "LoginUserId": this.id }).subscribe((result: any) => {
        this.agentDetail = result.data;
        if(result.data != null){
          this.newAgentDetail.image = (result.data.agentDetails.user.imageUrl !== undefined) ? result.data.agentDetails.user.imageUrl : ''
          this.newAgentDetail.fullName = (result.data.agentDetails.user.fullName !== undefined) ? result.data.agentDetails.user.fullName : ''
          this.newAgentDetail.expertIn = (result.data.agentDetails.expertIn !== undefined) ? result.data.agentDetails.expertIn : ''
          this.newAgentDetail.companyName = (result.data.agentDetails.company.companyName !== undefined) ? result.data.agentDetails.company.companyName : ''
          this.newAgentDetail.companyid = (result.data.agentDetails.company.id !== undefined) ? result.data.agentDetails.company.id : ''
          this.newAgentDetail.phoneNumber = (result.data.agentDetails.user.phoneNumber !== undefined) ? result.data.agentDetails.user.phoneNumber : ''
          this.newAgentDetail.companyAdress = (result.data.agentDetails.company.companyAdress !== undefined) ? result.data.agentDetails.company.companyAdress : ''
          this.newAgentDetail.brnNo = (result.data.agentDetails.brnNo !== undefined) ? result.data.agentDetails.brnNo : ''
          this.newAgentDetail.agentLanguages = (result.data.agentDetails.agentLanguages !== undefined) ? result.data.agentDetails.agentLanguages  : ''
          this.newAgentDetail.agentAreas = (result.data.agentDetails.agentAreas !== undefined) ? result.data.agentDetails.agentAreas : ''
          this.newAgentDetail.salePropertyListingCount = (result.data.salePropertyListingCount !== undefined) ? result.data.salePropertyListingCount : ''
          this.newAgentDetail.rentPropertyListingCount = (result.data.rentPropertyListingCount !== undefined) ? result.data.rentPropertyListingCount : ''
          this.newAgentDetail.commercialPropertyListingCount = (result.data.commercialPropertyListingCount !== undefined) ? result.data.commercialPropertyListingCount : ''
          this.newAgentDetail.aboutMe = (result.data.agentDetails.aboutMe !== undefined) ? result.data.agentDetails.aboutMe : ''

        }

      })
    } else {
      this.service.DisplayAgent({ "PropertyListingId": "", "AgentUserId": this.id, "LoginUserId": "" }).subscribe((result: any) => {
        this.agentDetail = result.data;

        if(result.data != null){
          this.newAgentDetail.image = (result.data.agentDetails.user.imageUrl !== undefined) ? result.data.agentDetails.user.imageUrl : ''
          this.newAgentDetail.fullName = (result.data.agentDetails.user.fullName !== undefined) ? result.data.agentDetails.user.fullName : ''
          this.newAgentDetail.expertIn = (result.data.agentDetails.expertIn !== undefined) ? result.data.agentDetails.expertIn : ''
          this.newAgentDetail.companyName = (result.data.agentDetails.company.companyName !== undefined) ? result.data.agentDetails.company.companyName : ''
          this.newAgentDetail.phoneNumber = (result.data.agentDetails.user.phoneNumber !== undefined) ? result.data.agentDetails.user.phoneNumber : ''
          this.newAgentDetail.companyAdress = (result.data.agentDetails.company.companyAdress !== undefined) ? result.data.agentDetails.company.companyAdress : ''
          this.newAgentDetail.brnNo = (result.data.agentDetails.brnNo !== undefined) ? result.data.agentDetails.brnNo : ''
          this.newAgentDetail.agentLanguages = (result.data.agentDetails.agentLanguages !== undefined) ? result.data.agentDetails.agentLanguages  : ''
          this.newAgentDetail.agentAreas = (result.data.agentDetails.agentAreas !== undefined) ? result.data.agentDetails.agentAreas : ''
          this.newAgentDetail.salePropertyListingCount = (result.data.salePropertyListingCount !== undefined) ? result.data.salePropertyListingCount : ''
          this.newAgentDetail.rentPropertyListingCount = (result.data.rentPropertyListingCount !== undefined) ? result.data.rentPropertyListingCount : ''
          this.newAgentDetail.commercialPropertyListingCount = (result.data.commercialPropertyListingCount !== undefined) ? result.data.commercialPropertyListingCount : ''
          this.newAgentDetail.aboutMe = (result.data.agentDetails.aboutMe !== undefined) ? result.data.agentDetails.aboutMe : ''

        }
      })
    }
    this.MyPropertyListings()
  }

  MyPropertyListings(){
    this.service.MyPropertyListings({"UserId":this.id , "SortedBy":this.sortedById}).subscribe((result: any) => {
      // this.myListing = result.data;
      let response :any = result.data
      let tempData: Array<Object> = []
      response.forEach((element, i) => {
        let documentsCheck: any = true;
        let rentTypeName = ''
        if (element.rentType != null) {
          rentTypeName = element.rentType.name
        }
        let image : any = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = element.documents[0].fileUrl
        }

        let userImage = '../assets/images/user.png'
        let fullName = ''
        let userId = ''
        if (element.user != null && element.user !== undefined) {
          userImage = this.baseUrl+element.user.imageUrl
          fullName = element.user.fullName
          userId = element.user.id
        }

        tempData.push(
          {
            buildupArea:element.buildupArea,
            id: element.id, favorite: element.favorite,userImage:userImage,fullName:fullName,userId:userId,
            StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.avgRentPrice, RecentRentTxns: element.recentRentTxns,
            image: image, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, documentsCheck: documentsCheck,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat, brokerageChargePrice: element.brokerageChargePrice, securityDepositPrice: element.securityDepositPrice,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency, propertyCode: element.propertyCode
          }
        );
      })
      this.myListing = tempData;

    })
  }

  PropertySortBy: any = []
  LoadPropertySortBy() {
    this.service.PropertySortBy().subscribe(e => {
      let temp: any = e;
      for (let list of temp.data) {
        this.PropertySortBy.push({ name: list.name, id: list.id });
      }
    });
  }
  sortedById :any  ='';
  sortedBy(event) {
    this.sortedById = event.value
    // let params: any = {
    //   MinCarpetArea:this.MinCarpetArea,MaxCarpetArea:this.MaxCarpetArea,PropertyFeatureIds:this.PropertyFeatureIds,KeyWords:this.KeyWords,
    //   FurnishingTypeId:this.FurnishingTypeId,
    //   "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
    //   "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,"videoTour": this.videoTourSorting,
    //   "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
    // }
    this.MyPropertyListings();
  }


  pageChanged(value: any) {
    this.page = value;
  }

  agentContact = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    phone: new FormControl("", Validators.required),
    message: new FormControl("", Validators.required),
  })

  get name() {
    return this.agentContact.get("name")
  }
  get email() {
    return this.agentContact.get("email")
  }
  get phone() {
    return this.agentContact.get("phone")
  }
  get message() {
    return this.agentContact.get("message")
  }
  leadData    : any = {};
  nameError :any = '';
  emailError :any = '';
  phoneError :any = '';
  messageError :any = '';

  leadProceedStore(){
    if (this.agentContact.invalid) {
        console.log('dede')
      if(this.agentContact.value.name == ''){
        this.nameError = "Name required"
      }else {
        this.nameError = ""
      }
      if(this.agentContact.value.email == ''){
        this.emailError = "Email required"
      }else {
        this.emailError = ""
      }
      if(this.agentContact.value.phone == ''){
        this.phoneError = "Phone required"
      }else{
        this.phoneError = ""
      }
      if(this.agentContact.value.message == ''){
        this.messageError = "Message required"
      }else {
        this.messageError = ""
      }
      return;
    }
    if (this.agentContact.valid) {
      this.leadData.name = this.agentContact.value.name
      this.leadData.email = this.agentContact.value.email
      this.leadData.phone = this.agentContact.value.phone
      this.leadData.message = this.agentContact.value.message
      this.leadData.PropertyListingId = ''
      this.leadData.UserId = this.id
      if(this.user != undefined && this.user != null){
        this.leadData.LoginUserId = this.user.id
      }else{
        this.leadData.LoginUserId = ''
      }

      this.service.StoreLead(this.leadData).subscribe(result => {
        if(result!=null){
          let responsedata :any = result;
          if(responsedata.message == "User Lead  submitted successfully"){
            if(responsedata.data != undefined && responsedata.error.length < 1){
              this.agentContact.controls.name.setValue('');
              this.agentContact.controls.email.setValue('');
              this.agentContact.controls.phone.setValue('');
              this.agentContact.controls.message.setValue('');
              this.nameError = ''
              this.emailError = ''
              this.phoneError = ''
              this.messageError = ''
              this.notifyService.showSuccess(responsedata.message, "");
            }else{
              this.notifyService.showError(responsedata.error[0], "");
            }
          }
        }else{
          this.notifyService.showError("Submitted Failed", "");
        }
      });
    }

  }


  ngOnInit(): void {


  }

}
