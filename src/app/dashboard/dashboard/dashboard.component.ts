import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from "../../service/notification.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppService } from 'src/app/service/app.service';
import { AuthService } from "../../service/auth.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  blogs: any;
  proFrame = '../../assets/images/profile/pro-img-frame.png'
  ovverified = 'assets/images/icons/ov-verified.svg'
  share1 = 'assets/images/icons/share-1.png'
  logoutimg = '../../assets/images/logout-popup-banner.png'
  proAvatar: any = '../../assets/images/user.png'
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
  wallet = '../../../../assets/images/wallet-img.png'
  twitter = '../../../assets/images/icons/twiiter-share.svg'
  fb = '../../../assets/images/icons/fb-share.svg'
  whatsapp = '../../../assets/images/icons/whatsapp.svg'
  share = '../../../assets/images/icons/share-1.png'
  refrell = '../../../assets/images/refrell-code.png'
  loggedInUser:any = localStorage.getItem('user')
  user: any;
  greet: any;
  country: any = [];
  city: any = [];
  countryId: number = -1;
  cityId: number = -1;
  dashboard: any;
  leadsData: any = [];
  userData: any = "";
  totalLength: number = 0;
  page: number = 1;
  professionalType: any;
  leadSummary: any = "";
  showLoader: boolean = true;
  myPackages: any;
  activitySavedSearch: any = [];
  leadsResidentialSummary: any = [];
  leadsCommercialSummary: any = [];
  areaData: any = [];
  activityViewData: any = [];
  minDate = new Date();
  plus = '../../../../assets/images/plus.svg';
  showSuccess:boolean = false;
  success:any = "";
  successResponse(data:any) {
    this.showSuccess = false;
  }
  errorResponse(data: any) {
    this.showError = false;
  }
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
  error: any = ""
  showError: boolean = false;
  residential: any;
  commercial: any;
  totalValuation: any;
  totalRestentailValuation: any;
  totalCommercialValuation: any;
  detailForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    address: new FormControl(""),
    location: new FormControl(""),
    dob: new FormControl("")
  });
  agentDetailForm = new FormGroup({
    agentBrnNo: new FormGroup(""),
    agentAboutMe: new FormGroup("")
  })
  companyDetailsForm = new FormGroup({
    companyName: new FormGroup(""),
    tradeLicenceNo: new FormGroup(""),
    permitNo: new FormGroup(""),
    ornNo: new FormGroup(""),
    reraNo: new FormGroup(""),
    companyAddress: new FormGroup("")
  })
  data: any = {};
  userFormData: any;
  agentDetailsFormData: any;
  companyDetailsFormData: any;
  userImage: any;
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(""),
    newPassword: new FormControl("")
  });
  cardForm = new FormGroup({
    cardNumber: new FormControl(""),
    expiryDate: new FormControl(""),
    cvv: new FormControl(""),
    cardName: new FormControl("")
  })
  myValuation: any = [];
  myValuationResidential: any = [];
  myValuationCommercial: any = [];


  lastPropertyLastingDate: any;
  totalRestentailPropertyListing: any;
  totalCommercialPropertyListing: any;
  lastValuationDate: any;
  totalRestValuation: any;
  totalCommValuation: any;
  myBalance: any = 0;
  seletedPackage: any = "";
  pointsData: any = "";
  pointsHistory: any = "";
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
  get agentBrnNo() {
    return this.agentDetailForm.get("agentbrnNo");
  }
  get agentAboutMe() {
    return this.agentDetailForm.get("agentAboutMe");
  }
  get companyName() {
    return this.companyDetailsForm.get("companyName");
  }
  get tradeLicenseNo() {
    return this.companyDetailsForm.get("tradeLicenseNo");
  }
  get permitNo() {
    return this.companyDetailsForm.get("permitNo");
  }
  get ornNo() {
    return this.companyDetailsForm.get("ornNo");
  }
  get reraNo() {
    return this.companyDetailsForm.get("reraNo");
  }
  get companyAddress() {
    return this.companyDetailsForm.get("companyAddress");
  }
  userId: number;
  parentTabId: any = "";
  childTabId: any = "";
  url: any = "";
  countryData:any = "";
  
  constructor(private authService: AuthService,
    private datePipe: DatePipe,
    private service: AppService,
    private route: Router,
    private notifyService: NotificationService,
    private modalService: NgbModal,
    private cookie: CookieService) {
        this.url = this.route.url.split("/");
        $(window).scrollTop(0);
        this.loggedInUser = JSON.parse(this.loggedInUser);
        this.getUser();
        this.userId = this.user.id;
        this.getloadDashboardData();
        this.getLoadListing()
        this.getTabCount();
        this.LoadvaluationDashboard();
        this.getLoadMyValuaionListing();
        this.getSpokenLanguages();
        this.getExpertIn();
        this.getNationality();
        this.lordMyActivityListingView();
        this.lordMyActivityAgentView();
        this.getViewCount();
        this.getEnquiredCount();
        this.getCountData('');
        this.getWishlisting();
        let temp: any = localStorage.getItem("user");
        this.service.UserProfile(JSON.parse(temp).id).subscribe((result: any) => {
          this.userData = result.data;
          this.professionalType = result.data.professionalTypeId;
          if (this.professionalType == null) {
            this.professionalType = 0;
          }
          localStorage.setItem("user", JSON.stringify(this.userData));
          if(this.userData.gender == "Male") {
            this.getGender(1)
          } else if(this.userData.gender == "Female") {
            this.getGender(2)
          }
          this.onCountrySelect({value:this.userData.countryId})
          this.onCitySelect({value:this.userData.cityId});
          if (this.userData.imageUrl == null) {
            this.proAvatar = '../../assets/images/user.png';
          } else {
            this.proAvatar = this.baseUrl + this.userData.imageUrl;
          }
          this.service.MyActivityPropertyListingViewForAgent({ "UserId": this.userData.id, "PropertyCategoryId": "" }).subscribe((result: any) => {
            this.activityViewData = result.data;
          })
          this.service.SummaryLeads({ "UserId": this.userData.id, "PropertyCategoryId": "1" }).subscribe((result: any) => {
            if (result.data.length > 0) {
              this.leadSummary = result.data;
              for (let i = 0; i < this.leadSummary.length; i++) {
                if (this.leadSummary[i].propertyListing.propertyCategory.categoryName == "Residential") {
                  this.leadsResidentialSummary.push(this.leadSummary[i]);
                } else {
                  this.leadsCommercialSummary.push(this.leadSummary[i])
                }
              }
            } else {
              this.leadSummary = "temp";
            }
            setTimeout(() => {
              if (this.url[2] == "wallet") {
                $(".dashboard-tabs .wallet-btn").click();
              } else if (this.url[2] == "my-listing") {
                $(".dashboard-tabs .my-listing-btn").click();
              }
            }, 500);
            this.showLoader = false;
          })
          this.service.MyPackages(this.userData.id).subscribe((result: any) => {
            this.myPackages = result.data;
          })
          this.service.MyActivitySavedSearchProperty({ "UserId": this.userData.id, "PropertyListingTypeId": "" }).subscribe((result: any) => {
            this.activitySavedSearch = result.data;
          })
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
        this.detailForm.patchValue({
          firstName: this.userFormData.firstName,
          lastName: this.userFormData.lastName,
          address: this.userFormData.address,
          dob: this.userFormData.dateOfBirth
        })
        this.service.MyValuations(JSON.parse(temp).id).subscribe((result: any) => {
          this.myValuation = result.data;
          for (let i = 0; i < this.myValuation.length; i++) {
            if (this.myValuation[i].propertyCategory.categoryName == "Residential") {
              this.myValuationResidential.push(this.myValuation[i]);
            } else {
              this.myValuationCommercial.push(this.myValuation[i]);
            }
          }
        })
        this.getPoints();
        this.service.GetPoints(1).subscribe((result: any) => {
          this.pointsData = result.data;
        })
        this.service.PointTransaction(this.loggedInUser.id).subscribe((result: any) => {
          this.pointsHistory = result.data;
        })
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if(this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.LoadBlogs();
        clearInterval(a);
      }
    },100);
  }
  getPoints() {
    this.service.MyWallet(this.loggedInUser.id).subscribe((result: any) => {
      this.myBalance = result.data;
    })
  }
  downloadReport(e: any) {
    this.showLoader = true;
    this.service.GenerateReport(e).subscribe((result: any) => {
      var blob = new Blob([result.body]);
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = e + ".pdf";
      link.click();
      this.showLoader = false;
    });
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
          if (reader.result == null) {
            this.proAvatar = '../../assets/images/user.png';
          } else {
            this.proAvatar = reader.result;
          }
        };
      }
    })
  }
  changePassword() {
    if (this.changePasswordForm.value.currentPassword == "") {
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
    if (this.detailForm.value.firstName == ""
      || this.detailForm.value.lastName == ""
      || this.detailForm.value.address == ""
      || this.countryId == -1
      || this.cityId == -1
      || $("#formDate").val() == "") {
      alert("Enter all the fields");
      return;
    }

    if (this.agentDetailForm.value.agentBrnNo == "") {
      alert("Enter BRN No");
      return;
    }
    if (this.agentDetailForm.value.agentAboutMe == "") {
      alert("Enter About Me");
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
    // this.data.BRNNo = this.agentDetailsFormData.value.agentBrnNo;
    // this.data.agentAboutMe = this.agentDetailsFormData.value.agentAboutMe;
    // this.data.CompanyName = this.companyDetailsFormData.value.companyName;
    // this.data.TradeLicenseNo = this.companyDetailsFormData.value.tradeLicenseNo;
    // this.data.PermitNo = this.companyDetailsFormData.value.permitNo;
    // this.data.ORNNo = this.companyDetailsFormData.value.ornNo;
    // this.data.RERANo = this.companyDetailsFormData.value.reraNo;
    // this.data.CompanyAddress = this.companyDetailsFormData.value.companyAddress;
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
  getAreaData(e: any) {
    this.areaData = e.value;
  }

  myValuationlistingAll: any = [];
  getLoadMyValuaionListing() {
    let tempData: Array<Object> = []
    this.service.LoadValuationListing({ "UserId": this.user.id, "PropertyCategoryId": "" }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null) {
          rentTypeName = element.rentType.name
        }
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        tempData.push(
          {
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img: image,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName
          }
        );
      })
      this.myValuationlistingAll = tempData
    });

  }


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



  public childTabsChange(id: any) {
    this.page = 1;
    this.childTabId = id
    // this.getTabCount();
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
      response.data.forEach((element: any, i: any) => {
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
  getTab(e: any) {
    if (e.index == 0) {
      this.LoadLeads('', '');
    } else if (e.index == 1) {
      this.LoadLeads('1', '');
    } else {
      this.LoadLeads('2', '');
    }
  }
  LoadLeads(CategoryId: any, TypeId: any) {
    this.leadsData = [];
    let temp: any = localStorage.getItem("user");
    temp = JSON.parse(temp).id;
    this.service.MyLeads({ "UserId": temp, "PropertyCategoryId": CategoryId, "PropertyListingTypeId": TypeId }).subscribe((result: any) => {
      this.leadsData = result.data;
      if (this.leadsData.length > 0) {
        for (let i = 0; i < this.leadsData.length; i++) {
          if (this.leadsData[i].propertyListing.propertyCategoryId == 1) {
            this.leadsData[i].propertyCategory = "Residential"
          } else {
            this.leadsData[i].propertyCategory = "Commercial"
          }
        }
        for (let i = 0; i < this.leadsData.length; i++) {
          if (this.leadsData[i].leadDate != null) {
            this.leadsData[i].leadDate = this.leadsData[i].leadDate.split("T")[0];
          }
        }
      }
    })
  }
  ngOnInit() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12)
      greet = '???? GOOD MORNING';
    else if (hrs >= 12 && hrs <= 17)
      greet = '???? GOOD AFTERNOON';
    else if (hrs >= 17 && hrs <= 24)
      greet = '???? GOOD EVENING';

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
    this.service.LoadBlogs(this.countryData.id).subscribe(data => {
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

  otherImages: any = [];
  uploadedDocuments: any = [];
  emirate: any = [];
  emiratesfun(files: FileList, index: number) {
    if (files && files.length) {
      let found: number = -1;
      for (let i = 0; i < this.otherImages.length; i++) {
        if (this.otherImages[i].index == index) {
          found = i;
        }
      }
      if (found == -1) {
        this.otherImages.push({ index: index, file: files[0] });
      } else {
        this.otherImages[found].file = files[0];
      }
      this.emirate[index] = files[0].name;
    }
  }

  listingAll: any = [];
  getLoadListing() {
    let tempData: Array<Object> = []
    this.service.LoadListing({ "UserId": this.user.id, "PropertyListingTypeId": this.parentTabId, "PropertyListingStatusId": this.childTabId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null && element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null && element.propertyListingTypeId != 2) {
          rentTypeName = '/' + element.rentType.name
        }
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        tempData.push(
          {
            id: element.id, propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img: image,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloor: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency
          }
        );
      })
      this.totalLength = tempData.length
      this.listingAll = tempData
    });

  }
  pageChanged(value: any) {
    this.page = value;
  }


  agentBroker = new FormGroup({
    BRNNo: new FormControl(""),
    agentAboutMe: new FormControl("")
  });

  companyDetail = new FormGroup({
    companyName: new FormControl(""),
    tradeLicenseNo: new FormControl(""),
    permitNo: new FormControl(""),
    ornNo: new FormControl(""),
    reraNo: new FormControl(""),
    companyAddress: new FormControl("")
  })

  ExpertIn: any = [];
  getExpertIn() {
    let tempData: Array<Object> = []
    this.service.LoadExpertIn().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
      this.ExpertIn = tempData
    });
  }
  SpokenLanguages: any = [];
  getSpokenLanguages() {
    let tempData: Array<Object> = []
    this.service.LoadSpokenLanguages().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
      this.SpokenLanguages = tempData
    });
  }


  Nationality: any = [];
  getNationality() {
    let tempData: Array<Object> = []
    this.service.LoadNationality().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
    });
    this.Nationality = tempData
  }

  expertArray: any = [];
  expertsChange(e: any): void {
    this.agentFormData.ExpertIn = e;
  }

  languagesArray: any = [];
  languagesArrayChange(e: any, value: any): void {
    let exists = true;
    this.languagesArray.forEach((element: any, i: any) => {
      if (element == value) {
        exists = false
      }
    })
    if (exists) {
      this.languagesArray.push(value)
    } else {
      this.languagesArray.forEach((element: any, index: any) => {
        if (element == value) delete this.languagesArray[index];
      });
    }
  }

  districts: any = [];
  getDistricts() {
    let tempData: Array<Object> = []
    this.service.LoadDistrict(1).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
    });
    this.districts = tempData
  }

  districtsIds: any = []
  getDistrictsIds(e: number) {
    this.districtsIds.push(e)
  }

  NationalityId: any;
  onChangeNationality(event: any) {
    this.NationalityId = event.value;
  }

  agentFormData: any = {};
  companyFormData: any = {};


  finalBrokerDocments: any = []
  documentsObject() {
    this.uploadedDocuments.forEach((element: any, i: any) => {
      let extension: any = element.fileName.split(".");
      this.finalBrokerDocments.push({ "FileId": i, "RegistrationDocumentTypeId": i.toString(), "FileName": element.fileName, "Extension": extension[1] });
    })
  }

  getCompanyData() {
    if (this.companyFormData.companyName) {
      this.error = "Enter Company Name";
      this.showError = true;
      return;
    } else if (this.companyFormData.tradeLicenseNo) {
      this.error = "Enter Trade License No";
      this.showError = true;
      return;
    } else if (this.companyFormData.premitNo) {
      this.error = "Enter Permit No";
      this.showError = true;
      return;
    } else if (this.companyFormData.ornNo) {
      this.error = "Enter ORN no";
      this.showError = true;
      return;
    } else if (this.companyFormData.reraNo) {
      this.error = "Enter RERA no";
      this.showError = true;
      return;
    } else if (this.companyFormData.companyAdress) {
      this.error = "Enter Company Address";
      this.showError = true;
      return;
    } else if (this.otherImages.length < 4) {
      this.notifyService.showError('Please select all images', "Error");
      return;
    }

    this.companyFormData.CompanyName = this.companyDetail.value.companyName;
    this.companyFormData.TradeLicenseNo = this.companyDetail.value.tradeLicenseNo;
    this.companyFormData.PremitNo = this.companyDetail.value.permitNo;
    this.companyFormData.ORNNo = this.companyDetail.value.ornNo;
    this.companyFormData.RERANo = this.companyDetail.value.reraNo;
    this.companyFormData.CompanyAdress = this.companyDetail.value.companyAddress;

    let valuationData = new FormData();
    valuationData.append("CompanyRequest", JSON.stringify(this.companyFormData));

    for (let i = 0; i < 4; i++) {
      valuationData.append(i + 1 + "_" + this.otherImages[i].file.name, this.otherImages[i].file);
    }


    // if ( this.data.CompanyName = this.companyDetailsFormData.value.companyName )
    let token: any = localStorage.getItem("token");
    // token = JSON.parse(token);
    // $.ajax({
    //   url: "https://beta.ovaluate.com/api/AddUpdateCompany",
    //   method: "post",
    //   contentType: false,
    //   processData: false,
    //   headers: {
    //     "Authorization": 'bearer ' + token
    //   },
    //   dataType: "json",
    //   success: (res) => {
    //     this.companyDetailsFormData = res.data.id;
    //     this.notifyService.showSuccess(res.message, "Company details updated successfully");
    //   },
    //   error: (err) => {
    //     this.notifyService.showError(err, "");

    //   }
    // })

  }

  agentBrokerId: any;
  imageObject: any = []
  getAgentData() {
    if (this.otherImages.length < 3) {
      this.notifyService.showError('Please enter all data', "Error");
    } else {

      if (this.NationalityId == null || this.NationalityId == undefined) {
        // this.notifyService.showError('Please select Nationality', "Error");
      }
      let langObject: any = []
      this.languagesArray.forEach((element: any, i: any) => {
        langObject.push({ SpokenLanguageId: element })
      })

      let temp: any = [];
      for (let i = 0; i < this.areaData.length; i++) {
        temp.push({ "DistrictId": this.areaData[i] });
      }


      let districtsIdsObject: any = []
      this.districtsIds.forEach((element: any, i: any) => {
        districtsIdsObject.push({ DistrictId: element })
      })

      let userData: any = localStorage.getItem("user");
      userData = JSON.parse(userData);
      this.agentFormData.UserId = userData.id.toString();
      if (this.agentBrokerId == null) {
        this.agentFormData.Id = "0";
      } else {
        this.agentFormData.Id = this.agentBrokerId.toString();
      }

      this.agentFormData.AboutMe = this.agentBroker.value.agentAboutMe;
      this.agentFormData.BRNNo = this.agentBroker.value.BRNNo;
      this.agentFormData.NationalityId = this.NationalityId.toString();
      this.agentFormData.AgentLanguages = langObject;
      // this.agentFormData.AgentAreas = temp;
      this.agentFormData.AgentAreas = temp;
      this.documentsObject();
      this.agentFormData.Documents = this.finalBrokerDocments
      this.uploadedDocuments = [];
      this.finalBrokerDocments = [];

      let valuationData = new FormData();
      valuationData.append("AgentRequest", JSON.stringify(this.agentFormData));

      for (let i = 0; i < 3; i++) {
        valuationData.append(i + 1 + "_" + this.otherImages[i].file.name, this.otherImages[i].file);
      }
      let token: any = localStorage.getItem("token");
      token = JSON.parse(token);
      $.ajax({
        url: "https://beta.ovaluate.com/api/AddUpdateAgentDetails",
        method: "post",
        contentType: false,
        processData: false,
        data: valuationData,
        headers: {
          "Authorization": 'bearer ' + token
        },
        dataType: "json",
        success: (res: any) => {
          this.agentBrokerId = res.data.id;
          if (res.message == "agent request completed successfully") {
            this.notifyService.showSuccess(res.message, "Agent details updated successfully");
          }
          // if(res.message == "Property Listing request completed successfully") {
          //   localStorage.removeItem("propertyData");
          //   this.route.navigate(['listpropertypublish'])
          // }
        },
        error: (err) => {
          this.notifyService.showError(err, "");

        }
      });
    }
  }

  viewBuyCount: any;
  viewRentCount: any;
  viewAgentCount: any;
  viewAllCount: any;
  getViewCount() {
    let tempData: Array<Object> = []
    this.service.MyActivityViewCount(this.user.id).subscribe(data => {
      let response: any = data;
      this.viewAllCount = response.data.all
      this.viewRentCount = response.data.rent
      this.viewBuyCount = response.data.buy
      this.viewAgentCount = response.data.agents
    });
  }


  viewChangeId: any;
  myActivityViewChange(e: any) {
    this.page = 1;
    this.viewChangeId = e;
    this.lordMyActivityListingView();
  }

  myActivityListingView: any = []
  lordMyActivityListingView() {
    this.totalLength = 0
    let tempData: Array<Object> = []
    this.service.MyActivityPropertyListingView({ "UserId": this.user.id, "PropertyListingTypeId": this.viewChangeId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null && element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null && element.propertyListingTypeId != 2) {
          rentTypeName = '/' + element.rentType.name
        }
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        tempData.push(
          {
            id: element.id, propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img: image,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloor: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat, propertyType: element.propertyType.typeDescription,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency
          }
        );
      })
      this.totalLength = tempData.length
      this.myActivityListingView = tempData;
    });
  }


  myActivityAgentView: any = []
  lordMyActivityAgentView() {
    let tempData: Array<Object> = []
    this.service.MyActivityAgentView({ "UserId": this.user.id }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        if (element.agentDetails.company.documents.length > 1 && element.agentDetails.company.documents !== undefined && element.agentDetails.company.documents !== null) {
          image = element.agentDetails.company.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        tempData.push(
          {
            img: this.baseUrl + image, rentPropertyListingCount: element.rentPropertyListingCount, salePropertyListingCount: element.salePropertyListingCount,
            commercialPropertyListingCount: element.commercialPropertyListingCount, company: element.agentDetails.company.companyName,
            aboutCompany: element.agentDetails.company.aboutCompany, premitNo: element.agentDetails.company.premitNo,
            reraNo: element.agentDetails.company.reraNo, id: element.agentDetails.user.id
          }
        );
      });
      this.myActivityAgentView = tempData;
    })
  }

  logOutPopup(content: any) {
    this.modalService.open(content, { centered: true });
  }
  rechargePopup(rechargemodal: any) {
    this.seletedPackage = "";
    this.modalService.open(rechargemodal, { centered: true });
  }
  PaymentPopup(PaymentPopupModal: any) {
    if (this.seletedPackage == "") {
      this.error = "Please Select a Package";
      this.showError = true;
      return;
    }
    this.modalService.open(PaymentPopupModal, { centered: true });
  }
  TransferPopup(TransferModal: any) {
    this.modalService.open(TransferModal, { centered: true });
  }

  buyCount: any;
  rentCount: any;
  allCount: any;
  getWishlisting() {
    let tempData: Array<Object> = []
    this.service.FavoriteListingCount(this.user.id).subscribe(data => {
      let response: any = data;
      this.allCount = response.data.all
      this.rentCount = response.data.rent
      this.buyCount = response.data.buy
    });
  }
  getCountChange(e: any) {
    let PropertyListingTypeId: any;
    if (e == 1) {
      PropertyListingTypeId = 1
    } else if (e == 2) {
      PropertyListingTypeId = 2
    } else {
      PropertyListingTypeId = '';
    }
    this.allCheckbox = [];
    this.getCountData(PropertyListingTypeId);
  }
  wishlistingData: any = []
  getCountData(PropertyListingTypeId: any) {
    let tempData: Array<Object> = []
    this.service.FavoriteListing({ "UserId": this.user.id, "PropertyListingTypeId": PropertyListingTypeId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {

        let image: any = '';
        if (element.documents !== null && element.documents !== undefined && element.documents.length > 0) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }

        let rentType: any = '';
        if (element.rentType != null && element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null && element.propertyListingTypeId != 2) {
          rentType = '/' + element.rentType.name
        }

        let propertyType: any = '';
        if (element.propertyType !== null && element.propertyType !== undefined) {
          propertyType = element.propertyType.typeDescription
        }

        tempData.push(
          {
            title: element.propertyTitle,
            rentType: rentType,
            propertyType: propertyType,
            currency: element.country.currency,
            price: element.propertyPrice,
            favorite: element.favorite,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            propertyAddress: element.propertyAddress,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
            requestedDateFormat: element.requestedDateFormat,
            furnishingType: element.furnishingType
          });
      })
    });
    setTimeout(() => {
      this.wishlistingData = tempData
    }, 1000);
  }

  wishlistStatus: any;
  removeFavorite(id: any) {
    if (this.user.id == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    this.service.FavoriteAddRemove(true, { "UserId": this.user.id, "PropertyListingId": id }).subscribe(data => {
      let responsedata: any = data
      this.wishlistStatus = "Favorite is Removed successfully"
      this.notifyService.showSuccess('Favorite is Removed successfully', "");
    });
    setTimeout(() => {
      this.getCountData('');
      this.getCountData(1);
      this.getCountData(2);
      this.getWishlisting();
    }, 1000);
  }

  allCheckbox: any = []
  allFormCheckbox(id: number) {
    this.allCheckbox.push({ 'id': id })
  }
  compareProceed(type: any) {
    if (this.user.id == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    if (type == "all") {
      if (this.allCheckbox.length < 2 || this.allCheckbox.length > 4) {
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      } else {
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds', JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    }
  }

  enquiredBuyCount: any;
  enquiredRentCount: any;
  enquiredAllCount: any;
  getEnquiredCount() {
    this.service.MyActivityEnquiredCount(this.user.id).subscribe(data => {
      let response: any = data;
      this.enquiredAllCount = response.data.all
      this.enquiredRentCount = response.data.rent
      this.enquiredBuyCount = response.data.buy
    });
  }

  getEnquiredCountChange(e: any) {
    let PropertyListingTypeId: any;
    if (e == 1) {
      PropertyListingTypeId = 1
    } else if (e == 2) {
      PropertyListingTypeId = 2
    } else {
      PropertyListingTypeId = '';
    }
    this.getEnquiredListingData(PropertyListingTypeId);
  }

  enquiredlistingData: any = []
  getEnquiredListingData(PropertyListingTypeId: any) {
    let tempData: Array<Object> = []
    this.service.MyActivityEnquired({ "UserId": this.user.id, "PropertyListingTypeId": PropertyListingTypeId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {

        let image: any = '';
        if (element.documents !== null && element.documents !== undefined && element.documents.length > 0) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        let rentType: any = '';
        if (element.rentType != null && element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null && element.propertyListingTypeId != 2) {
          rentType = '/' + element.rentType.name
        }

        let propertyType: any = '';
        if (element.propertyType !== null && element.propertyType !== undefined) {
          propertyType = element.propertyType.typeDescription
        }
        tempData.push(
          {
            title: element.propertyTitle,
            rentType: rentType,
            propertyType: propertyType,
            currency: element.country.currency,
            price: element.propertyPrice,
            favorite: element.favorite,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            propertyAddress: element.propertyAddress,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
            requestedDateFormat: element.requestedDateFormat,
            furnishingType: element.furnishingType
          });
      })
    });
    setTimeout(() => {
      this.enquiredlistingData = tempData
    }, 1000);
  }
  copyCode() {
    navigator.clipboard.writeText(this.userData.referralCode);
    alert("Copied")
  }
  getPackage(index: any) {
    this.seletedPackage = this.pointsData[index];
  }
  purchasePoints() {
    let number: any = this.cardForm.value.cardNumber;
    let date: any = this.cardForm.value.expiryDate;
    let cvv: any = this.cardForm.value.cvv;
    let currentDate: any = this.datePipe.transform(this.minDate, 'yyyy-MM-dd')?.split("-");
    if (this.cardForm.value.cardNumber == "" || this.cardForm.value.cardNumber == null) {
      this.error = "Please Enter Card Number";
      this.showError = true;
      return;
    } else if (number.toString().length < 16) {
      this.error = "Please Enter a Valid Card Number";
      this.showError = true;
      return;
    } else if (this.cardForm.value.expiryDate == "") {
      this.error = "Please Enter Card Expiry";
      this.showError = true;
      return;
    } else if (date.toString().length < 5) {
      this.error = "Please Enter a Valid Card Expiry";
      this.showError = true;
      return;
    } else if ("20" + date.toString().split("/")[1] < currentDate[0]) {
      this.error = "Please Enter a Valid Card Expiry";
      this.showError = true;
      return;
    } else if ("20" + date.toString().split("/")[1] == currentDate[0] && date.toString().split("/")[0] < currentDate[1] || date.toString().split("/")[0] > 12) {
      this.error = "Please Enter a Valid Card Expiry";
      this.showError = true;
      return;
    } else if (this.cardForm.value.cvv == "" || this.cardForm.value.cvv == null) {
      this.error = "Please Enter CVV";
      this.showError = true;
      return;
    } else if (cvv.toString().length < 3) {
      this.error = "Please Enter a valid CVV";
      this.showError = true;
      return;
    } else if (this.cardForm.value.cardName == "" || this.cardForm.value.cardName == null) {
      this.error = "Please Enter Card Holder Name";
      this.showError = true;
    }
    let temp:any = {};
    temp.UserId = this.loggedInUser.id;
    temp.Email = this.loggedInUser.email;
    temp.PointId = this.seletedPackage.id;
    temp.CardNumder = this.cardForm.value.cardNumber;
    temp.CardNumder = this.cardForm.value.cardNumber;
    temp.Month = date.split("/")[0];
    temp.Year = date.split("/")[1];
    temp.CVC = this.cardForm.value.cvv;
    temp.Amount = this.seletedPackage.price;
    temp.CustomerName = this.cardForm.value.cardName;
    temp.Currency = this.seletedPackage.country.currency;
    temp.DescriptionPayment = "Point Package";
    this.showLoader = true;
    this.service.PointPayment(temp).subscribe((result:any) => {
      if(result.message == "Purchasing Point is completed successfully") {
        this.showLoader = false;
        this.getPoints();
        $(".payment-cancel-btn").click();
        this.success = "Payment Successful"
        this.showSuccess = true;
      }
    })
  }

  onKeypressEvent(e: any) {
    this.checkLength(3, false)
  }
  checkLength(e: any, type: boolean) {
    if (e == 1) {
      let temp: any = this.cardForm.value.cardNumber;
      if (temp != null) {
        if (temp.toString().length > 16) {
          this.cardForm.patchValue({
            cardNumber: temp.toString().slice(0, -1)
          })
        }
      }
    } else if (e == 2) {
      let temp: any = this.cardForm.value.cvv;
      if (temp.toString().length > 4) {
        this.cardForm.patchValue({
          cvv: temp.toString().slice(0, -1)
        })
      }
    } else if (e == 3) {
      let temp: any = this.cardForm.value.expiryDate;
      if (temp.replace("/", "") >= 0) {
        if (temp.toString().length == 2 && !type) {
          this.cardForm.patchValue({
            expiryDate: temp.toString() + "/"
          })
        } else if (temp.toString().length == 3 && type) {
          this.cardForm.patchValue({
            expiryDate: temp.toString().slice(0, -1)
          })
        } else if (temp.toString().length > 5) {
          this.cardForm.patchValue({
            expiryDate: temp.toString().slice(0, -1)
          })
        }
      } else {
        this.cardForm.patchValue({
          expiryDate: temp.toString().slice(0, -1)
        })
      }
    }
  }
}
