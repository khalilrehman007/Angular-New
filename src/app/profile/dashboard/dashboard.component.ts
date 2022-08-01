import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from "../../service/notification.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'profile-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  blogs: any;
  proFrame = '../../assets/images/profile/pro-img-frame.png'
  proAvatar = '../../assets/images/profile/Profile-Pic.png'
  proClose = '../../assets/images/profile/close.png'
  proImgEdit = '../../assets/images/profile/edit.png'
  proEdit = '../../assets/images/profile/create.png'
  ValuationVect = '../../assets/images/profile/valution-vector.png'
  ListingVect = '../../assets/images/profile/listing-vector.png'
  ViewIcon = '../../assets/images/profile/view.png'
  CopyIcon = '../../assets/images/profile/copy.png'
  MoreIcon = '../../assets/images/profile/right-arrow.png'
  menuDots = '../../assets/images/profile/menu-dots.png'
  viewLeads = '../../assets/images/profile/phone-call.png'
  shareicon = '../../assets/images/profile/comments.png'
  deleteIcon = '../../assets/images/profile/whatsapp.png'
  editIcon = '../../assets/images/profile/play-alt.png'
  approvedEmo = '../../assets/images/profile/approved.svg'
  penfingEmo = '../../assets/images/profile/pending.svg'
  logoutIcon = '../../assets/images/profile/logout-icon.svg'
  uaeFlag = '../../assets/images/profile/uae.svg'
  upload = '../../../../assets/images/icons/upload-1.svg'
  web = '../../../../assets/images/icons/web.png'
  profile = '../../../../assets/images/icons/user-profile.png'
  acsetting = '../../../../assets/images/icons/settings-icn.png'
  aclogout = '../../../../assets/images/icons/log-out.png'
  shareimg = '../../../../assets/images/icons/share-icn.png'
  deleteimg = '../../../../assets/images/icons/delteicn.png'
   editimg = '../../../../assets/images/icons/editimg.png'
  loggedInUser = localStorage.getItem('user')
  user: any
  greet: any
  country: any = [];
  city: any = [];
  countryId: number = -1;
  cityId: number = -1;
  dashboard: any;

  plus = '../../../../assets/images/plus.svg'

  bedrooms = [
    { viewValue: '01', value: 'bedroom' },
    { viewValue: '02', value: 'bedroom' },
    { viewValue: '03', value: 'bedroom' },
  ];
  bathroom = [
    { viewValue: '01', value: 'bedroom' },
    { viewValue: '02', value: 'bedroom' },
    { viewValue: '03', value: 'bedroom' },
  ];
  baseUrl = 'https://beta.ovaluate.com/'
  all: any;
  rent: any;
  buy: any;
  residential: any;
  commercial: any
  totalValuation: any
  totalRestentailValuation: any
  totalCommercialValuation: any
  detailForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    phone: new FormControl(""),
    location: new FormControl(""),
  });
  data:any = {};
  userImage: any;
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(""),
    newPassword: new FormControl("")
  });


  lastPropertyLastingDate :any;
  totalRestentailPropertyListing :any;
  totalCommercialPropertyListing :any;
  lastValuationDate :any;
  totalRestValuation :any;
  totalCommValuation :any;
  get firstName() {
    return this.detailForm.get("firstName");
  }
  get lastName() {
    return this.detailForm.get("lastName");
  }
  get phone() {
    return this.detailForm.get("phone");
  }
  get location() {
    return this.detailForm.get("location");
  }
  get currentPassword() {
    return this.changePasswordForm.get("currentPassword");
  }
  get newPassword() {
    return this.changePasswordForm.get("newPassword");
  }

  constructor(private service: AppService, private route: Router, private notifyService: NotificationService) {
    this.getUser();
    this.LoadBlogs();
    this.getloadDashboardData();
    this.getLoadListing()
    this.getTabCount();
    this.LoadvaluationDashboard();
    this.getLoadMyValuaionListing();

    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        this.rent = temp.data[0].name;
        this.buy = temp.data[1].name;
      }
    });
    this.service.LoadCountries().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Country list fetched successfully") {
        for (let country of temp.data) {
          this.country.push({ viewValue: country.name, value: country.id });
        }
      }
      console.log(this.country);
    });
    this.service.LoadDashboardData(35).subscribe(e => {
      let temp: any = e;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.dashboard = jsonParsDate
      this.lastPropertyLastingDate = this.dashboard.lastPropertyLastingDate
      this.totalRestentailPropertyListing = this.dashboard.totalRestentailPropertyListing
      this.totalCommercialPropertyListing = this.dashboard.totalCommercialPropertyListing
      this.lastValuationDate = this.dashboard.lastValuationDate
      this.totalRestValuation = this.dashboard.totalRestValuation
      this.totalCommValuation = this.dashboard.totalCommValuation

    });

  }
  getImage(e: any) {
    this.userImage = e.target.files;
  }
  changePassword() {
    if(this.changePasswordForm.value.currentPassword == this.changePasswordForm.value.newPassword) {
      let temp:any = localStorage.getItem("user");
      temp = JSON.parse(temp);
      this.service.ChangePassword({"Email":temp.email,"Password":this.changePasswordForm.value.currentPassword, "ConfirmPassword":this.changePasswordForm.value.newPassword}).subscribe((result:any)=> {
        alert(result.message);
      })
    } else {
      alert("Password does not match");
    }
  }
  getData() {
    let temp: any = localStorage.getItem("user");
    temp = JSON.parse(temp);
    let detailFormData = new FormData()
    this.data.Id = temp.id;
    this.data.FirstName = this.detailForm.value.firstName;
    this.data.LastName = this.detailForm.value.lastName;
    this.data.Email = temp.email;
    this.data.PhoneNumber = temp.phoneNumber;
    let extension: any = this.userImage[0].name.split(".");
    extension = extension[extension.length - 1];
    detailFormData.append("ProfileRequest", JSON.stringify(this.data));
    detailFormData.append("Banner", this.userImage);
    detailFormData.append("Extension", extension);
    this.service.UpdateProfile(detailFormData).subscribe((result:any)=> {
      if(result.message == "User Profile  Updated successfully") {
        alert(result.message);
      } else {
        alert("Something went wrong");
      }
    });
  }
  //My Valuation Start
  LoadvaluationDashboard() {
    this.service.valuationDashboard(35).subscribe(e => {
      let temp: any = e;
      if (temp.message == "User Data  fetched successfully") {
        this.totalValuation = temp.data.totalValuation;
        this.totalRestentailValuation = temp.data.totalRestentailValuation;
        this.totalCommercialValuation = temp.data.totalCommercialValuation;
      }
    });
    this.LoadPropertyCategories();
  }
  LoadPropertyCategories() {
    this.service.PropertyCategories().subscribe(data => {
      let response: any = data;
      this.residential = response.data[0].categoryName;
      this.commercial = response.data[1].categoryName;
    });
  }

  myValuationlistingAll: any = [];
  getLoadMyValuaionListing() {
    let tempData: Array<Object> = []
    this.service.LoadValuationListing({ "UserId": 35, "PropertyCategoryId": "" }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element, i) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null) {
          rentTypeName = element.rentType.name
        }
        if (element.documents.length > 1) {
          image = element.documents[0].fileUrl
        }
        tempData.push(
          {
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img: this.baseUrl + image,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName
          }
        );
      })
    });

    this.myValuationlistingAll = tempData

  }

  parentTabId: any;
  public parentTabsChange(e: any) {
    //allId nuLL
    let parentTabId: any = '';
    if (e.index == 1) {
      //rentId
      parentTabId = 1
    } else if (e.index == 2) {
      //buyId
      parentTabId = 2
    }
    this.parentTabId = parentTabId
    this.childTabId = ''
    this.getTabCount();
    this.getLoadListing();
  }


  childTabId: any;
  public childTabsChange(id) {
    this.childTabId = id
    this.getTabCount();
    this.getLoadListing();
  }

  tabCounts: any = {}
  getTabCount() {
    this.service.LoadListingDashboard({ "UserId": 35, "PropertyListingTypeId": this.parentTabId }).subscribe(data => {
      let temp: any = data;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.tabCounts = jsonParsDate
      this.listingStatus();
    })
  }

  propertyListingStatus: any = []
  listingStatus() {
    let tempData: Array<Object> = []
    this.service.LoadPropertyListingStatus().subscribe(data => {
      let response: any = data;
      response.data.forEach((element, i) => {
        let name = element.statusDescription
        let count: number = 0;
        if (name == "all") {
          count = this.tabCounts.totalPropertyListing
        } else if (name == "rent") {
          count = this.tabCounts.propertyListingRent
        } else if (name == "buy") {
          count = this.tabCounts.propertyListingBuy
        } else if (name == "Active") {
          count = this.tabCounts.propertyListingActive
        } else if (name == "Expired") {
          count = this.tabCounts.propertyListingExpired
        } else if (name == "Under Review") {
          count = this.tabCounts.propertyListingUnderReview
        } else if (name == "Rejected") {
          count = this.tabCounts.propertyListingRejected
        } else if (name == "Deleted") {
          count = this.tabCounts.propertyListingDeleted
        } else if (name == "Expire Soon") {
          count = this.tabCounts.propertyListingExpireSoon
        }
        tempData.push(
          { id: element.id, statusDescription: element.statusDescription, count: count });
      })
    });
    this.propertyListingStatus = tempData
    console.log(this.propertyListingStatus, 'dede')
  }

  ngOnInit() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12)
      greet = '🌅 GOOD MORNING';
    else if (hrs >= 12 && hrs <= 17)
      greet = '🌞 GOOD AFTERNOON';
    else if (hrs >= 17 && hrs <= 24)
      greet = '🌇 GOOD EVENING';

    this.greet = greet
  }

  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }

  logout() {
    this.notifyService.showSuccess('Logout Successfully', "");
    localStorage.clear();
    this.route.navigate(['login'])
  }

  LoadBlogs() {
    this.service.LoadBlogs().subscribe(data => {
      this.blogs = data;
      this.blogs = this.blogs.data.filter((blog: any, key: any, array: any) => {
        if (key < 3) {
          return blog;
        }
      })
    });
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

  onCountrySelect(e: any) {
    this.countryId = e.value;
    this.city = [];
    this.service.LoadCities(e.value).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.name, value: city.id });
        }
      }
    });
  }
  onCitySelect(e: any) {
    this.cityId = e.value;
  }
  getGender(id: number) {

  }
  getloadDashboardData() {
    this.service.LoadDashboardData(35).subscribe(e => {
      let temp: any = e;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.dashboard = jsonParsDate
    });
  }

  listingAll: any = [];
  getLoadListing() {
    let tempData: Array<Object> = []
    this.service.LoadListing({ "UserId": 35, "PropertyListingTypeId": this.parentTabId, "PropertyListingStatusId": this.childTabId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element, i) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null) {
          rentTypeName = element.rentType.name
        }
        if (element.documents.length > 1) {
          image = element.documents[0].fileUrl
        }
        tempData.push(
          {
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img:this.baseUrl+image,
            buildingName: element.buildingName,bedrooms: element.bedrooms,bathrooms: element.bathrooms,carpetArea: element.carpetArea,
            unitNo: element.unitNo,totalFloor: element.totalFloor,floorNo: element.floorNo,propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate,furnishingType: element.furnishingType,propertyPrice: element.propertyPrice,
            requestedDateFormat:element.requestedDateFormat,
            expiredDateFormat:element.expiredDateFormat,rentType:rentTypeName,currency:element.country.currency
          }
        );
      })
    });

    this.listingAll = tempData
  }

}
