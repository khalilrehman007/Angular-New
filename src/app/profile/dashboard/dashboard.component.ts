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
  proAvatar: any = ''
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
  leadsData:any = [];
  userData:any = {};
  totalLength: number = 0;
  page: number = 1;

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
    address: new FormControl(""),
    location: new FormControl(""),
    dob: new FormControl("")
  });
  data: any = {};
  userFormData: any;
  userImage: any;
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(""),
    newPassword: new FormControl("")
  });
  myValuation:any = [];
  myValuationResidential:any = [];
  myValuationCommercial:any = [];


  lastPropertyLastingDate: any;
  totalRestentailPropertyListing: any;
  totalCommercialPropertyListing: any;
  lastValuationDate: any;
  totalRestValuation: any;
  totalCommValuation: any;
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
    let temp: any = localStorage.getItem("user");
    this.service.UserProfile(JSON.parse(temp).id).subscribe((result: any) => {
      this.userData = result.data;
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.proAvatar = this.baseUrl + this.userData.imageUrl;
    })
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
    });
    this.service.LoadDashboardData(this.user.id).subscribe(e => {
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
    this.LoadLeads("", "");
    this.userFormData = localStorage.getItem("user");
    this.userFormData = JSON.parse(this.userFormData);
    console.log(this.userFormData);
    this.detailForm.patchValue({
      firstName: this.userFormData.firstName,
      lastName: this.userFormData.lastName,
      address: this.userFormData.address,
      dob: this.userFormData.dateOfBirth
    })
    this.service.MyValuations(JSON.parse(temp).id).subscribe((result:any) => {
      this.myValuation = result.data;
      for(let i = 0; i < this.myValuation.length; i++) {
        if(this.myValuation[i].propertyCategory.categoryName == "Residential") {
          this.myValuationResidential.push(this.myValuation[i]);
        } else {
          this.myValuationCommercial.push(this.myValuation[i]);
        }
      }
    })
  }
  getImage(e: any) {
    let temp: any = localStorage.getItem("user");
    temp = JSON.parse(temp);
    let imageData = new FormData();
    this.userImage = e.target.files;
    let extension: any = this.userImage[0].name.split(".");
    extension = extension[extension.length - 1];
    imageData.append("ProfileRequest", JSON.stringify({ "Id": temp.id }))
    imageData.append(this.userImage[0].name, this.userImage[0]);
    imageData.append("Extension", extension);
    this.service.UpdateImage(imageData).subscribe((result: any) => {
      localStorage.setItem("user", JSON.stringify(result.data));
      if (result.message == "User  fetched successfully") {
        const reader = new FileReader();
        reader.readAsDataURL(this.userImage[0]);
        reader.onload = () => {
          this.proAvatar = reader.result;
        };
      }
    })
  }
  changePassword() {
    if(this.changePasswordForm.value.currentPassword == "") {
      alert("Enter Password");
    } else if (this.changePasswordForm.value.currentPassword == this.changePasswordForm.value.newPassword) {
      let temp: any = localStorage.getItem("user");
      temp = JSON.parse(temp);
      this.service.ChangePassword({ "Id": temp.id, "Password": this.changePasswordForm.value.currentPassword, "ConfirmPassword": this.changePasswordForm.value.newPassword }).subscribe((result: any) => {
        alert("Password Changed Successfully");
        this.changePasswordForm.reset();
      })
    } else {
      alert("Password does not match");
    }
  }
  getData() {
    if(this.detailForm.value.firstName == ""
      || this.detailForm.value.lastName == ""
      || this.detailForm.value.address == ""
      || this.countryId == -1
      || this.cityId == -1
      || $("#formDate").val() == "") {
      alert("Enter all the fields");
      return;
    }
    let temp: any = localStorage.getItem("user");
    temp = JSON.parse(temp);
    this.data.Id = temp.id;
    this.data.FirstName = this.detailForm.value.firstName;
    this.data.LastName = this.detailForm.value.lastName;
    this.data.Email = temp.email;
    this.data.Address = this.detailForm.value.address;
    this.data.CountryId = this.countryId;
    this.data.CityId = this.cityId;
    this.data.DateOfBirth = $("#formDate").val();
    this.service.UpdatePersonalDetails(this.data).subscribe((result: any) => {
      if (result.message == "User  fetched successfully") {
        alert("Profile Update Successfully");
        localStorage.setItem("user", JSON.stringify(result.data))
      } else {
        alert("Something went wrong");
      }
    });
  }
  LoadvaluationDashboard() {
    this.service.valuationDashboard(this.user.id).subscribe(e => {
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
    this.service.LoadValuationListing({ "UserId": this.user.id, "PropertyCategoryId": "" }).subscribe(data => {
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
    this.service.LoadListingDashboard({ "UserId": this.user.id, "PropertyListingTypeId": this.parentTabId }).subscribe(data => {
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
  }
  getTab(e:any) {
    if(e.index == 0) {
      this.LoadLeads('','');
    } else if(e.index == 1) {
      this.LoadLeads('1','');
    } else {
      this.LoadLeads('2','');
    }
  }
  LoadLeads(CategoryId: any, TypeId: any) {
    this.leadsData = [];
    let temp: any = localStorage.getItem("user");
    temp = JSON.parse(temp).id;
    this.service.MyLeads({ "UserId": temp, "PropertyCategoryId": CategoryId, "PropertyListingTypeId": TypeId }).subscribe((result: any) => {
      this.leadsData = result.data;
      for(let i = 0; i < this.leadsData.length; i++) {
        if(this.leadsData[i].propertyListing.propertyCategoryId == 1) {
          this.leadsData[i].propertyCategory = "Residential"
        } else {
          this.leadsData[i].propertyCategory = "Commercial"
        }
      }
      for(let i = 0; i < this.leadsData.length; i++) {
        this.leadsData[i].leadDate = this.leadsData[i].leadDate.split("T")[0];
      }
    })
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
    this.data.Gender = id;

  }
  getloadDashboardData() {
    this.service.LoadDashboardData(this.user.id).subscribe(e => {
      let temp: any = e;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.dashboard = jsonParsDate
    });
  }

  listingAll: any = [];
  getLoadListing() {
    let tempData: Array<Object> = []
    this.service.LoadListing({ "UserId": this.user.id, "PropertyListingTypeId": this.parentTabId, "PropertyListingStatusId": this.childTabId }).subscribe(data => {
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
            unitNo: element.unitNo, totalFloor: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency
          }
        );
      })
    });

    this.listingAll = tempData
  }
  pageChanged(value: any) {
    this.page = value;
  }

}
