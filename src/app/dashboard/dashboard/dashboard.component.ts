import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { NotificationService } from "../../service/notification.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppService } from 'src/app/service/app.service';
import { AuthService } from "../../service/auth.service";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  blogs: any;
  proFrame = '../../assets/images/profile/pro-img-frame.png'
  pdf = 'assets/images/icons/pdf.png'
  ovverified = 'assets/images/icons/ov-verified.svg'
  share1 = 'assets/images/icons/share-1.png'
  logoutimg = '../../assets/images/logout-popup-banner.png'
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
  wallet = '../../../../assets/images/wallet-img.png'
  twitter = '../../../assets/images/icons/twiiter-share.svg'
  fb = '../../../assets/images/icons/fb-share.svg'
  whatsapp = '../../../assets/images/icons/whatsapp.svg'
  share = '../../../assets/images/icons/share-1.png'
  refrell = '../../../assets/images/refrell-code.png'
  loggedInUser: any = localStorage.getItem('user')
  agentDocumentTypes: any = [];
  companyDocumentTypes: any = [];
  companiesList: any = [];
  firstSelectedArea:any='';
  user: any;
  greet: any;
  currentField: any;
  country: any = [];
  city: any = [];
  Nationality: any = [];
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
  showSuccess: boolean = false;
  agentFormRequired: boolean = false;
  success: any = "";
  agentDetails: any = {};
  agentLanguages: any = [];
  finalAgentDocments: any = [];
  finalCompanyDocments: any = [];
  ExpertInName!: string;
  agentAreas: any = [];
  confirmMessage: any = "";
  showConfirm: any = "";
  deleteID: any = "";
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showRecentTransactions: boolean = false;
  showPriceRange: boolean = false;
  showAvgSqft: boolean = false;
  showDIDiv: boolean = true;
  viewChangeId: any = '';
  successResponse(data: any) {
    this.showSuccess = false;
  }
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
  }
  confirmResponse(data: any) {
    this.showConfirm = false;
    if (data == "Yes") {
      this.service.DeletePropertyListing(this.deleteID).subscribe((result: any) => {
        if (result.result == 1) {
          this.success = "Property Deleted Successfully";
          this.showSuccess = true;
          this.getTabCount();
          this.listingStatus();
          this.getLoadListing();
        }
      })
    }
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
  baseUrl = environment.apiUrl;
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
  public countryFilterCtrl: FormControl = new FormControl();
  public filteredCountries: any = new ReplaySubject(1);
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCities: any = new ReplaySubject(1);
  public nationalityFilterCtrl: FormControl = new FormControl();
  public filteredNationality: any = new ReplaySubject(1);
  public areaFilterCtrl: FormControl = new FormControl();
  public filteredAreas: any = new ReplaySubject(1);
  public companyFilterCtrl: FormControl = new FormControl();
  public filteredCompanies: any = new ReplaySubject(1);
  protected _onDestroy = new Subject();
  //Form Groups Start
  detailForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl(null, Validators.required),
    countryId: new FormControl(null, Validators.required),
    cityId: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
  });
  agentDetailForm = new FormGroup({
    agentBrnNo: new FormControl(null),
    agentAboutMe: new FormControl(null),
    expertIn: new FormControl(null),
    linkedIn: new FormControl(null),
    experience: new FormControl(null, [Validators.maxLength(2), Validators.pattern("^[0-9]*$")]),
    nationalityId: new FormControl(null, Validators.required),
    areas: new FormControl([], Validators.required),
    id: new FormControl(0),
    userId: new FormControl(null),
  })
  companyDetailForm = new FormGroup({
    id: new FormControl(0),
    companyId: new FormControl(''),
    companyName: new FormControl(null, Validators.required),
    aboutCompany: new FormControl(null, Validators.required),
    tradeLicenseNo: new FormControl(null, Validators.required),
    premitNo: new FormControl(null, Validators.required),
    ornNo: new FormControl(null, Validators.required),
    reraNo: new FormControl(null, Validators.required),
    companyAdress: new FormControl(null, Validators.required)
  })
  //Form Groups End
  data: any = {};
  userFormData: any;
  agentDetailsFormData: any;
  companyDetailsFormData: any;
  userImage: any;
  changePasswordForm = new FormGroup({
    id: new FormControl(0),
    oldPassword: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')])
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
  userId: any;
  parentTabId: any = "";
  childTabId: any = "";
  url: any = "";
  countryData: any = "";
  shareURL: any = "";
  shareURLTemp: any = "";
  whatsAppShareUrl: any = "";
  facebookShareUrl: any = "";
  twitterShareUrl: any = "";
  constructor(private domSanitizer: DomSanitizer, private authService: AuthService,
    private datePipe: DatePipe,
    private service: AppService,
    private route: Router,
    private notifyService: NotificationService,
    private modalService: NgbModal,
    private cookie: CookieService) {
    let temp: any = window.location.href;
    temp = temp.split("/");
    temp[1] = "//";
    temp[2] = temp[2] + "/";
    temp[3] = temp[3] + "/";
    temp.pop().toString().replaceAll(",", "");
    this.shareURL = temp.toString().replaceAll(",", "");
    this.shareURLTemp = this.shareURL;
    this.url = this.route.url.split("/");
    $(window).scrollTop(0);
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.getUser();
    this.userId = this.user.id;
    this.getloadDashboardData();
    this.getLoadListing()
    this.getTabCount();
    this.GetCompaniesList();
    this.GetAgentDocumentTypes();
    this.GetCompanyDocumentTypes();
    this.LoadvaluationDashboard();
    this.getLoadMyValuaionListing();
    this.getSpokenLanguages();
    this.getExpertIn();
    this.lordMyActivityListingView();
    this.loadViewActivityData();
    this.lordMyActivityAgentView();
    this.getViewCount();
    this.getActiveViewCount();
    this.getEnquiredCount();
    this.getCountData('');
    this.getWishlisting();
    this.service.UserProfile(this.userId).subscribe((result: any) => {
      this.userData = result.data;
      if (result.result == 1) {
        let genderId: any = this.userData.gender == "Male" ? 1 : 2;
        this.detailForm.patchValue({
          id: this.userData.id,
          address: this.userData.address,
          countryId: this.userData.countryId,
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          gender: genderId,
          dateOfBirth: this.userData.dateOfBirth,
          cityId: this.userData.cityId,
          location: this.userData.location
        })
      }
      this.professionalType = this.userData.professionalTypeId;
      if (this.professionalType == null) {
        this.professionalType = 0;
      }
      localStorage.setItem("user", JSON.stringify(this.userData));
      if (this.userData.gender == "Male") {
        this.getGender(1)
      } else if (this.userData.gender == "Female") {
        this.getGender(2)
      }
      if (this.userData.imageUrl == null) {
        this.proAvatar = '../../assets/images/user.png';
      } else {
        this.proAvatar = this.baseUrl + this.userData.imageUrl;
      }
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
          } else if (this.url[2] == "my-valuation") {
            $(".dashboard-tabs .my-valuation-btn").click();
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
        this.filteredCountries.next(this.country)
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
    this.service.MyValuations(this.userId).subscribe((result: any) => {
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

  GetAgentDocumentTypes() {
    this.showLoader = true;
    this.service.GetAgentDocumentTypes().subscribe({
      next: (resp: any) => {
        this.agentDocumentTypes = resp.data;
        this.showLoader = false;
      },
      error: (err: any) => {
        this.showLoader = false;
      }
    })
  }
  GetCompanyDocumentTypes() {
    this.showLoader = true;
    this.service.GetCompanyDocumentTypes().subscribe({
      next: (resp: any) => {
        this.companyDocumentTypes = resp.data;
        this.showLoader = false;
      },
      error: (err: any) => {
        this.showLoader = false;
      }
    })
  }
  GetCompaniesList() {
    this.showLoader = true;
    this.service.GetAllCompanies().subscribe({
      next: (resp: any) => {
        this.companiesList = resp.data;
        this.filteredCompanies.next(this.companiesList);
        this.showLoader = false;
      },
      error: (err: any) => {
        this.showLoader = false;
      }
    })
  }

  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.LoadBlogs();
        this.getDistricts()
        setTimeout(() => {
          this.getAgentAndCompanyProfile();
        }, 200);
        clearInterval(a);
      }
    }, 100);
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

  animate() {
    let temp: any = $(this.currentField).offset()?.top;
    $(this.currentField).addClass("blink");
    $(this.currentField).on("click", () => {
      $(this.currentField).removeClass("blink");
      this.currentField = "";
    })
    $(window).scrollTop(temp - 200);
  }
  getData() {
    if (this.detailForm.get('firstName')?.hasError('required')) {
      this.currentField = ".firstName-input";
      this.error = "Enter First Name";
      this.showError = true;
      return;
    }
    else if (this.detailForm.get('lastName')?.hasError('required')) {
      this.currentField = ".lastName-input";
      this.error = "Enter Last Name";
      this.showError = true;
      return;
    }
    else if (this.detailForm.get('gender')?.hasError('required')) {
      this.currentField = ".gender-input";
      this.error = "Select Gender";
      this.showError = true;
      return;
    }
    else if (this.detailForm.get('dateOfBirth')?.hasError('required')) {
      this.currentField = ".dob-input";
      this.error = "Select Date of Birth";
      this.showError = true;
      return;
    }
    else if (this.detailForm.get('countryId')?.hasError('required')) {
      this.currentField = ".country-input";
      this.error = "Select Country";
      this.showError = true;
      return;
    }
    else if (this.detailForm.get('cityId')?.hasError('required')) {
      this.currentField = ".city-input";
      this.error = "Select City";
      this.showError = true;
      return;
    }
    else if (this.detailForm.get('address')?.hasError('required')) {
      this.currentField = ".address-input";
      this.error = "Enter Address";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    this.service.UpdatePersonalDetails(this.detailForm.value).subscribe((resp: any) => {
      if (resp.result == 1) {
        this.showLoader = false;
        this.success = "Profile Updated Successfully!"
        this.showSuccess = true;
        localStorage.setItem("user", JSON.stringify(resp.data))
      }
      else {
        this.showLoader = false;
        this.error = "Failed to update user profile";
        this.showError = true;
      }
    },
      (error: any) => {
        this.showLoader = false;
        this.showError = true;
        this.error = error;
      }
    );
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
        let checked: boolean = false;
        if (name == "all") {
          count = this.tabCounts.totalPropertyListing
        } else if (name == "rent") {
          count = this.tabCounts.propertyListingRent
        } else if (name == "buy") {
          count = this.tabCounts.propertyListingBuy
        } else if (name == "Active") {
          count = this.tabCounts.propertyListingActive
          checked = true;
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
          { id: element.id, statusDescription: element.statusDescription, count: count, checked: checked });
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
    this.getNationality();
    this.companyDetailForm.controls['companyId'].valueChanges.subscribe(x => {
      if (x != "other") {
        this.PatchCompanyForm(x)
      }
    })
    this.detailForm.controls['countryId'].valueChanges.subscribe(x => {
      this.onCountrySelect(x);
    })
    this.agentDetailForm.controls['areas'].valueChanges.subscribe(x=>{
      console.log(x);
      if(x!=undefined && x?.length>0){
        x.sort((a: any, b: any) => (a> b) ? 1 : -1)
        let district = this.districts.find((y: any) => {
          return y.id === x[0]
        })
        this.firstSelectedArea=district?.name;
      }
    })
    this.filteredCountries.next(this.country.slice());
    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });
    this.filteredCities.next(this.city.slice());
    this.cityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCities();
      });

    this.filteredNationality.next(this.Nationality.slice());
    this.nationalityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterNationality();
      });
    this.filteredAreas.next(this.districts.slice());
    this.areaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterArea();
      });
    this.filteredCompanies.next(this.companiesList.slice());
    this.companyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterComapny();
      });
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
  filterCountries() {
    if (!this.country) {
      return;
    }

    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.country.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCountries.next(
      this.country.filter((x: any) => x.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  filterCities() {
    if (!this.city) {
      return;
    }

    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCities.next(this.city.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCities.next(
      this.city.filter((x: any) => x.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  filterNationality() {
    if (!this.Nationality) {
      return;
    }

    let search = this.nationalityFilterCtrl.value;
    if (!search) {
      this.filteredNationality.next(this.Nationality.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredNationality.next(
      this.Nationality.filter((x: any) => x.name.toLowerCase().indexOf(search) > -1)
    );
  }
  filterArea() {
    if (!this.districts) {
      return;
    }

    let search = this.areaFilterCtrl.value;
    if (!search) {
      this.filteredAreas.next(this.districts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredAreas.next(
      this.districts.filter((x: any) => x.name.toLowerCase().indexOf(search) > -1)
    );
  }
  filterComapny() {
    if (!this.companiesList) {
      return;
    }

    let search = this.companyFilterCtrl.value;
    if (!search) {
      this.filteredCompanies.next(this.companiesList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCompanies.next(
      this.companiesList.filter((x: any) => x.companyName.toLowerCase().indexOf(search) > -1)
    );
  }
  PatchCompanyForm(id: any) {
    this.otherCompanyImages = [];
    this.finalCompanyDocments = [];
    this.companyFileNames = [];
    let company = this.companiesList.find((y: any) => {
      return y.id === id
    })
    if (company != null && company != undefined) {
      this.companyDetailForm.patchValue({
        id: company?.id,
        companyName: company?.companyName,
        aboutCompany: company?.aboutCompany,
        tradeLicenseNo: company?.tradeLicenseNo,
        premitNo: company?.premitNo,
        ornNo: company?.ornNo,
        reraNo: company?.reraNo,
        companyAdress: company?.companyAdress,
      })
      if (company?.documents?.length > 0) {
        company?.documents.sort((a: any, b: any) => (a.registrationDocumentTypeId > b.registrationDocumentTypeId) ? 1 : -1)
        for (let item of company?.documents) {
          this.companyFileNames.push(item.fileName);
          this.finalCompanyDocments.push({
            "FileId": item.fileId,
            "RegistrationDocumentTypeId": item.registrationDocumentTypeId,
            "FileName": item.fileName, "Extension": item.extension, "FileUrl": item.fileUrl,
            "Id": item.id
          });
        }
      }
    }
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
    this.countryId = e;
    this.city = [];
    this.service.LoadCities(e).subscribe(e => {
      let temp: any = e;
      if (temp.message == "City list fetched successfully") {
        for (let city of temp.data) {
          this.city.push({ viewValue: city.name, value: city.id });
        }
        this.filteredCities.next(this.city);
      }
    });
    this.detailForm.get('cityId')?.patchValue(null);
    if (e == 1) {
      this.agentFormRequired = true;
      this.agentDetailForm.controls['agentBrnNo']?.setValidators(Validators.required);
      this.agentDetailForm.controls['agentBrnNo']?.updateValueAndValidity();
      this.agentDetailForm.controls['agentAboutMe']?.setValidators(Validators.required);
      this.agentDetailForm.controls['agentAboutMe']?.updateValueAndValidity();
      this.agentDetailForm.controls['expertIn']?.setValidators(Validators.required);
      this.agentDetailForm.controls['expertIn']?.updateValueAndValidity();
    }
    else {
      this.agentFormRequired = false;
      this.agentDetailForm.controls['agentBrnNo']?.clearValidators();
      this.agentDetailForm.controls['agentBrnNo']?.updateValueAndValidity();
      this.agentDetailForm.controls['agentAboutMe']?.clearValidators();
      this.agentDetailForm.controls['agentAboutMe']?.updateValueAndValidity();
      this.agentDetailForm.controls['expertIn']?.clearValidators();
      this.agentDetailForm.controls['expertIn']?.updateValueAndValidity();
    }
  }
  onCitySelect(e: any) {
    this.cityId = e.value;
  }
  getGender(id: any) {
    this.detailForm.get('gender')?.patchValue(id);
  }
  getloadDashboardData() {
    this.service.LoadDashboardData(this.user.id).subscribe(e => {
      let temp: any = e;
      let jsonData: any = JSON.stringify(temp.data)
      let jsonParsDate: any = JSON.parse(jsonData);
      this.dashboard = jsonParsDate
    });
  }

  otherAgentImages: any = [];
  agentFileNames: any = [];
  uploadAgentImages(files: FileList, documentType: any, index: number) {
    if (this.finalAgentDocments.length > 0) {
      this.finalAgentDocments.splice(index, 1);
    }
    if (files && files.length) {
      let found: boolean = this.otherAgentImages.some((x: any) => x.index === index);
      if (found) {
        this.otherAgentImages[index].file = files[0];
      } else {
        this.otherAgentImages.push({ index: index, file: files[0], RegistrationDocumentTypeId: documentType });
      }
      this.agentFileNames[index] = files[0].name;
    }
  }
  documentsObject() {
    this.otherAgentImages.forEach((element: any, i: any) => {
      let found: boolean = this.finalAgentDocments.some((x: any) => x.RegistrationDocumentTypeId === element.RegistrationDocumentTypeId);
      if (found == false) {
        let extension: any = element.file.name.split(".");
        this.finalAgentDocments.push({ "FileId": i + 1, "RegistrationDocumentTypeId": element.RegistrationDocumentTypeId, "FileName": element.file.name, "Extension": extension[1] });
      }
    })
  }
  otherCompanyImages: any = [];
  companyFileNames: any = [];
  uploadCompanyImages(files: FileList, documentType: any, index: number) {
    if (this.finalCompanyDocments.length > 0) {
      this.finalCompanyDocments.splice(index, 1);
    }
    if (files && files.length) {
      let found: boolean = this.otherCompanyImages.some((x: any) => x.index === index);
      if (found) {
        this.otherCompanyImages[index].file = files[0];
      } else {
        this.otherCompanyImages.push({ index: index, file: files[0], RegistrationDocumentTypeId: documentType });
      }
      this.companyFileNames[index] = files[0].name;
    }
  }
  documentsObjectCompany() {
    this.otherCompanyImages.forEach((element: any, i: any) => {
      let found: boolean = this.finalCompanyDocments.some((x: any) => x.RegistrationDocumentTypeId === element.RegistrationDocumentTypeId);
      if (found == false) {
        let extension: any = element.file.name.split(".");
        this.finalCompanyDocments.push({ "FileId": i + 1, "RegistrationDocumentTypeId": element.RegistrationDocumentTypeId, "FileName": element.file.name, "Extension": extension[1] });
      }
    })
  }

  listingAll: any = [];
  getLoadListing() {
    let tempData: Array<Object> = []
    if (this.childTabId == "" || this.childTabId == null || this.childTabId == undefined) {
      this.childTabId = 1
    }
    this.service.LoadListing({ "UserId": this.user.id, "PropertyListingTypeId": this.parentTabId, "PropertyListingStatusId": this.childTabId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null && element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null && element.propertyListingTypeId != 2) {
          rentTypeName = '/' + element.rentType.name
        }
        if (element.documents.length > 0) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        tempData.push(
          {
            id: element.id, propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img: image,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea, buildupArea: element.buildupArea,
            unitNo: element.unitNo, totalFloor: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription, plotSize: element.plotSize,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency, unitType: element.country.unitType
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

  openCamera() {
    $(".camera-image").click();
  }
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



  getNationality() {
    this.showLoader = true;
    this.service.LoadNationality().subscribe((resp: any) => {
      this.Nationality = resp.data;
      this.filteredNationality.next(resp.data);
      this.showLoader = false;
    }, (error) => {
      this.showLoader = false;
    });
  }

  expertArray: any = [];
  expertsChange(e: any): void {
    this.agentDetailForm.get("expertIn")?.patchValue(e);
  }


  languagesArrayChange(e: any, value: any): void {
    let exists = true;
    this.agentLanguages.forEach((element: any, i: any) => {
      if (element == value) {
        exists = false
      }
    })
    if (exists) {
      this.agentLanguages.push(value)
    } else {
      this.agentLanguages.forEach((element: any, index: any) => {
        if (element == value) {
          this.agentLanguages.splice(index, 1)
        }
      });
    }
  }

  districts: any = [];
  getDistricts() {
    let tempData: Array<Object> = []
    this.service.LoadDistrict(this.countryData.id).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { id: element.id, name: element.name });
      })
    });
    this.districts = tempData
    this.filteredAreas.next(this.districts);
  }

  districtsIds: any = []
  getDistrictsIds(e: number) {
    this.districtsIds.push(e)
  }

  NationalityId: any = 0;
  onChangeNationality(event: any) {
    this.NationalityId = event.value;
  }




  companyDataId: any;
  imageObjectCompany: any = [];
  getCompanyData() {
    this.documentsObjectCompany();
    let firstImage = this.otherCompanyImages.some((x: any) => x.index === 0);
    let secondImage = this.otherCompanyImages.some((x: any) => x.index === 1);
    let thirdImage = this.otherCompanyImages.some((x: any) => x.index === 2);
    let fourthImage = this.otherCompanyImages.some((x: any) => x.index === 3);
    let fifthImage = this.otherCompanyImages.some((x: any) => x.index === 4);
    if (this.finalCompanyDocments.length > 0) {
      firstImage = true;
    }
    if (this.finalCompanyDocments.length > 1) {
      secondImage = true;
    }
    if (this.finalCompanyDocments.length > 2) {
      thirdImage = true;
    }
    if (this.finalCompanyDocments.length > 3) {
      fourthImage = true;
    }
    if (this.finalCompanyDocments.length > 4) {
      fifthImage = true;
    }
    if (this.companyDetailForm.get('companyName')?.hasError('required')) {
      this.currentField = ".companyName-input";
      this.error = "Enter Company Name";
      this.showError = true;
      return;
    }
    else if (this.companyDetailForm.get('aboutCompany')?.hasError('required')) {
      this.currentField = ".aboutCompany-input";
      this.error = "Write About Your Company";
      this.showError = true;
      return;
    }
    else if (this.companyDetailForm.get('tradeLicenseNo')?.hasError('required')) {
      this.currentField = ".tradeLicense-input";
      this.error = "Enter Trade License No.#";
      this.showError = true;
      return;
    }
    else if (this.companyDetailForm.get('premitNo')?.hasError('required')) {
      this.currentField = ".permitNo-input";
      this.error = "Enter Permit No.#";
      this.showError = true;
      return;
    }
    else if (this.companyDetailForm.get('ornNo')?.hasError('required')) {
      this.currentField = ".ornNo-input";
      this.error = "Enter ORN No.#";
      this.showError = true;
      return;
    }
    else if (this.companyDetailForm.get('reraNo')?.hasError('required')) {
      this.currentField = ".reraNo-input";
      this.error = "Enter RERA No.#";
      this.showError = true;
      return;
    }
    else if (this.companyDetailForm.get('companyAdress')?.hasError('required')) {
      this.currentField = ".companyAdress-input";
      this.error = "Enter Company Address";
      this.showError = true;
      return;
    }
    else if (!firstImage) {
      this.currentField = ".c-4-input";
      this.error = "Upload Trade License Document";
      this.showError = true;
      return;
    }
    else if (!secondImage) {
      this.currentField = ".c-5-input";
      this.error = "Upload Permit No Document";
      this.showError = true;
      return;
    }
    else if (!thirdImage) {
      this.currentField = ".c-6-input";
      this.error = "Upload ORN Document";
      this.showError = true;
      return;
    }
    else if (!fourthImage) {
      this.currentField = ".c-7-input";
      this.error = "Upload Rera Document";
      this.showError = true;
      return;
    }
    else if (!fifthImage) {
      this.currentField = ".c-8-input";
      this.error = "Upload Company Logo";
      this.showError = true;
      return;
    }

    this.showLoader = true;
    let companyFormData: any = {};
    companyFormData.Id = this.companyDetailForm.value.id;
    companyFormData.CompanyName = this.companyDetailForm.value.companyName;
    companyFormData.AboutCompany = this.companyDetailForm.value.aboutCompany;
    companyFormData.TradeLicenseNo = this.companyDetailForm.value.tradeLicenseNo;
    companyFormData.PremitNo = this.companyDetailForm.value.premitNo;
    companyFormData.ORNNo = this.companyDetailForm.value.ornNo;
    companyFormData.RERANo = this.companyDetailForm.value.reraNo;
    companyFormData.CompanyAdress = this.companyDetailForm.value.companyAdress;

    companyFormData.Documents = this.finalCompanyDocments;

    let data: any = {};
    data.company = companyFormData;
    data.UserId = this.userId;
    let companyRequestData = new FormData();
    companyRequestData.append("CompanyRequest", JSON.stringify(data));

    for (let i = 0; i < this.otherCompanyImages.length; i++) {
      companyRequestData.append(i + 1 + "_" + this.otherCompanyImages[i].file.name, this.otherCompanyImages[i].file);
    }

    this.service.AddUpdateCompany(companyRequestData).subscribe((resp: any) => {
      if (resp.result == 1) {
        this.otherCompanyImages = [];
        this.finalCompanyDocments = [];
        this.companyFileNames = [];
        this.GetCompaniesList();
        this.getAgentAndCompanyProfile();
        this.showLoader = false;
        this.success = "Company Detail Updated Successfully!"
        this.showSuccess = true;
      }
      else {
        this.showLoader = false;
        this.error = "Failed to update company detail";
        this.showError = true;
      }
    },
      (error: any) => {
        this.showLoader = false;
        this.showError = true;
        this.error = error;
      }
    )
  }

  getAgentData() {
    this.documentsObject();
    let firstImage = this.otherAgentImages.some((x: any) => x.index === 0);
    let secondImage = this.otherAgentImages.some((x: any) => x.index === 1);
    let thirdImage = this.otherAgentImages.some((x: any) => x.index === 2);
    if (this.finalAgentDocments.length > 0) {
      firstImage = true;
    }
    if (this.finalAgentDocments.length > 1) {
      secondImage = true;
    }
    if (this.finalAgentDocments.length > 2) {
      thirdImage = true;
    }

    if (this.agentDetailForm.get('agentAboutMe')?.hasError('required')) {
      this.currentField = ".aboutme-input";
      this.error = "Enter About Me";
      this.showError = true;
      return;
    }
    else if (this.agentDetailForm.get('agentBrnNo')?.hasError('required')) {
      this.currentField = ".brn-input";
      this.error = "Enter BRN No.#";
      this.showError = true;
      return;
    }
    else if (this.agentDetailForm.get('experience')?.hasError('pattern')) {
      this.currentField = ".experience-input";
      this.error = "Experience accepts only numbers";
      this.showError = true;
      return;
    }
    else if (this.agentDetailForm.get('expertIn')?.hasError('required') && this.agentFormRequired) {
      this.currentField = ".expertIn-input";
      this.error = "Select Expert In";
      this.showError = true;
      return;
    }
    else if (this.agentDetailForm.get('nationalityId')?.hasError('required')) {
      this.currentField = ".nationality-input";
      this.error = "Select Nationality";
      this.showError = true;
      return;
    }
    else if (this.agentDetailForm.get('areas')?.hasError('required') && this.agentDetailForm.value.areas?.length == 0) {
      this.currentField = ".areas-input";
      this.error = "Select at least one area.";
      this.showError = true;
      return;
    }
    else if (this.agentFormRequired && (this.agentLanguages.length == 0)) {
      this.currentField = ".language-input";
      this.error = "Select Languages";
      this.showError = true;
      return;
    }
    else if (!firstImage && this.agentFormRequired) {
      this.currentField = ".a-1-input";
      this.error = "Upload  Emirates ID (Fornt View)";
      this.showError = true;
      return;
    }
    else if (!secondImage && this.agentFormRequired) {
      this.currentField = ".a-2-input";
      this.error = "Upload  Emirates ID (Back View)";
      this.showError = true;
      return;
    }
    else if (!thirdImage && this.agentFormRequired) {
      this.currentField = ".a-3-input";
      this.error = "Upload BRN Document";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    let agentSelectedLanguages: any = []
    this.agentLanguages.forEach((element: any, i: any) => {
      agentSelectedLanguages.push({ SpokenLanguageId: element })
    })
    if (this.agentDetailForm.value.userId == null || this.agentDetailForm.value.userId == undefined || this.agentDetailForm.value.userId == 0) {
      this.agentDetailForm.get('userId')?.patchValue(this.userId);
    }
    let agentFormAreas: any = this.agentDetailForm.value.areas;
    let agentAreas: any = [];
    for (let i = 0; i < agentFormAreas.length; i++) {
      agentAreas.push({ "DistrictId": agentFormAreas[i] });
    }
    let agentFormData: any = {};
    agentFormData.Id = this.agentDetailForm.value.id;
    agentFormData.UserId = this.agentDetailForm.value.userId;
    agentFormData.AboutMe = this.agentDetailForm.value.agentAboutMe;
    agentFormData.BRNNo = this.agentDetailForm.value.agentBrnNo;
    agentFormData.NationalityId = this.agentDetailForm.value.nationalityId;
    agentFormData.ExpertIn = this.agentDetailForm.value.expertIn;
    agentFormData.LinkedIn = this.agentDetailForm.value.linkedIn;
    agentFormData.Experience = this.agentDetailForm.value.experience;
    agentFormData.AgentLanguages = agentSelectedLanguages;
    agentFormData.AgentAreas = agentAreas;
    agentFormData.Documents = this.finalAgentDocments
    let AgentRequestData = new FormData();
    AgentRequestData.append("AgentRequest", JSON.stringify(agentFormData));
    for (let i = 0; i < this.otherAgentImages.length; i++) {
      AgentRequestData.append(i + 1 + "_" + this.otherAgentImages[i].file.name, this.otherAgentImages[i].file);
    }

    this.service.AddUpdateAgentDetails(AgentRequestData).subscribe((resp: any) => {
      if (resp.result == 1) {
        this.otherAgentImages = [];
        this.finalAgentDocments = [];
        this.agentFileNames = [];
        this.agentLanguages = [];
        this.getAgentAndCompanyProfile();
        this.showLoader = false;
        this.success = "Agent Detail Updated Successfully!"
        this.showSuccess = true;

      }
      else {
        this.showLoader = false;
        this.error = "Failed to update agent detail";
        this.showError = true;
      }
    },
      (error: any) => {
        this.showLoader = false;
        this.showError = true;
        this.error = error;
      }
    )
  }

  changePassword() {
    if (this.changePasswordForm.get('oldPassword')?.hasError('required')) {
      this.currentField = ".currentPass-Input";
      this.error = "Enter Current Password";
      this.showError = true;
      return;
    }
    else if (this.changePasswordForm.get('password')?.hasError('required')) {
      this.currentField = ".Pass-Input";
      this.error = "Enter New Password";
      this.showError = true;
      return;
    }
    else if (this.changePasswordForm.get('password')?.hasError('pattern')) {
      this.currentField = ".Pass-Input";
      this.error = "New password doesn't meet the required pattern";
      this.showError = true;
      return;
    }
    else if (this.changePasswordForm.value.password != this.changePasswordForm.value.confirmPassword) {
      this.currentField = ".confirmPass-Input";
      this.error = "Confirm password doesn't match the new password";
      this.showError = true;
      return;
    }
    this.showLoader = true;
    this.changePasswordForm.get('id')?.patchValue(this.userId);
    this.service.ChangePassword(this.changePasswordForm.value).subscribe((resp: any) => {
      if (resp.result == 1) {
        this.showLoader = false;
        this.success = "Password Updated Successfully!"
        this.showSuccess = true;
        this.changePasswordForm.reset();
      }
      else {
        this.showLoader = false;
        this.error = "Failed to change password";
        this.showError = true;
      }
    },
      (error: any) => {
        this.showLoader = false;
        this.showError = true;
        this.error = error;
      }
    )

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
  activeBuyCount: any;
  activeRentCount: any;
  activeAllCount: any;
  getActiveViewCount() {
    this.showLoader = true;
    this.service.MyActivityPropertyListingViewForAgentCount(this.userId).subscribe((resp: any) => {
      this.activeBuyCount = resp.data.buy
      this.activeRentCount = resp.data.rent
      this.activeAllCount = resp.data.all
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    })
  }


  myActivityViewChange(e: any) {
    this.page = 1;
    this.viewChangeId = e;
    this.lordMyActivityListingView();
  }

  myActivityListingView: any = []
  lordMyActivityListingView() {
    this.showLoader = true;
    this.totalLength = 0
    let tempData: Array<Object> = []
    this.service.MyActivityPropertyListingView({ "UserId": this.user.id, "PropertyListingTypeId": this.viewChangeId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        let rentTypeName = ''
        if (element.rentType != null && element.propertyListingTypeId != 2) {
          rentTypeName = element.rentType.name
        }
        if (element.documents.length > 0) {
          image = this.baseUrl + element.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        if (element.recentRentTxns != 0 && element.recentRentTxns != null && element.recentRentTxns != undefined) {
          this.showRecentTransactions = true;
        }
        else {
          this.showRecentTransactions = false;
        }
        if (element.rentAvgPriceSqft != 0 && element.rentAvgPriceSqft != null && element.rentAvgPriceSqft != undefined) {
          this.showAvgSqft = true;
        }
        else {
          this.showAvgSqft = false;
        }
        if ((element.startRentPrice != 0 && element.startRentPrice != null && element.startRentPrice != undefined)
          || (element.endRentPrice != 0 && element.endRentPrice != null && element.endRentPrice != undefined)
        ) {
          this.showPriceRange = true;
        }
        else {
          this.showPriceRange = false;
        }
        if (this.showRecentTransactions == false && this.showPriceRange == false && this.showAvgSqft == false) {
          this.showDIDiv = false;
        }
        else {
          this.showDIDiv = true;
        }
        let companyLogoImage = '';
        if (element.company != null && element.company?.documents.length > 0) {
          let companyLogo = element.company?.documents.find((y: any) => {
            return y.registrationDocumentTypeId === 8
          })
          if (companyLogo != null && companyLogo != undefined) {
            companyLogoImage = this.baseUrl + companyLogo.fileUrl;
          }
        }
        this.shareURL += "property/detail?id=" + element.id;
        this.whatsAppShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://wa.me/?text=" + encodeURI(this.shareURL));
        this.facebookShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(this.shareURL) + "%3Futm_source%3Dfacebook%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
        this.twitterShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://twitter.com/intent/tweet?url=" + encodeURI(this.shareURL) + "%3Futm_source%3Dtwitter%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");

        tempData.push(
          {
            buildupArea: element.buildupArea,
            plotSize: element.plotSize,
            id: element.id, favorite: element.favorite,
            StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.rentAvgPriceSqft, RecentRentTxns: element.recentRentTxns,
            img: image, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat,
            rentType: rentTypeName, listingTypeId: element.propertyListingTypeId, currency: element.country.currency, propertyCode: element.propertyCode,
            listingType: element.propertyListingTypeId == 1 ? "Rent" : "Sale", showRecentTransactions: this.showRecentTransactions,
            showAvgSqft: this.showAvgSqft, showPriceRange: this.showPriceRange, showDIDiv: this.showDIDiv,
            whatsAppShareUrl: this.whatsAppShareUrl, facebookShareUrl: this.facebookShareUrl, twitterShareUrl: this.twitterShareUrl,companyLogoImage:companyLogoImage
          }
        );
        this.shareURL = this.shareURLTemp;
      })
      this.totalLength = tempData.length
      this.myActivityListingView = tempData;
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    });
  }
  activityViewType: any = '';
  myActivityViewTypeChange(e: any) {
    this.page = 1;
    this.activityViewType = e;
    this.loadViewActivityData();
  }
  loadViewActivityData() {
    this.showLoader = true;
    this.service.MyActivityPropertyListingViewForAgent({ "UserId": this.userId, "PropertyListingTypeId": this.activityViewType }).subscribe({
      next:(result: any) => {
        let data = result.data;
        data.forEach((element:any)=>{
        let mainImage:any='assets/images/placeholder.png';
        if(element.documents!=null && element.documents.length>0){
          mainImage=this.baseUrl+element.documents[0].fileUrl;
        }
        let companyLogoImage = '';
        if (element.company != null && element.company?.documents.length > 0) {
          let companyLogo = element.company?.documents.find((y: any) => {
            return y.registrationDocumentTypeId === 8
          })
          if (companyLogo != null && companyLogo != undefined) {
            companyLogoImage = this.baseUrl + companyLogo.fileUrl;
          }
        }
        this.activityViewData.push({
          mainImage:mainImage,id:element.id,propertyPrice:element.propertyPrice,country:element.country,rentType:element.rentType,
          propertyTitle:element.propertyTitle,requestedDateFormat:element.requestedDateFormat,numberOfUsershortListedProperty:element.numberOfUsershortListedProperty,
          numberOfUserSeeingProperty:element.numberOfUserSeeingProperty,propertyAddress:element.propertyAddress,propertyType:element.propertyType,
          bedrooms:element.bedrooms,bathrooms:element.bathrooms,plotSize:element.plotSize,buildupArea:element.buildupArea,carpetArea:element.carpetArea,
          furnishingType:element.furnishingType,companyLogoImage:companyLogoImage
        })
        })
        this.showLoader = false;
      },
      error:(err:any)=>{
        this.showLoader=false;
      }
    })
  }
  myActivityAgentView: any = []
  lordMyActivityAgentView() {
    let tempData: Array<Object> = []
    this.service.MyActivityAgentView({ "UserId": this.user.id }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image: any;
        if (element.agentDetails?.company?.documents.length > 1 && element.agentDetails?.company?.documents !== undefined && element.agentDetails.company?.documents !== null) {
          image = element.agentDetails?.company.documents[0].fileUrl
        } else {
          image = 'assets/images/placeholder.png'
        }
        tempData.push(
          {
            img: this.baseUrl + image, rentPropertyListingCount: element.rentPropertyListingCount, salePropertyListingCount: element.salePropertyListingCount,
            commercialPropertyListingCount: element.commercialPropertyListingCount, company: element.agentDetails?.company?.companyName,
            aboutCompany: element.agentDetails?.company?.aboutCompany, premitNo: element.agentDetails?.company?.premitNo,
            reraNo: element.agentDetails?.company?.reraNo, id: element.agentDetails.user.id
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
  getAgentAndCompanyProfile() {
    this.showLoader = true;
    this.service.GetAgentProfile(this.userId).subscribe({
      next: (resp: any) => {
        if (resp.result == 1 && resp.data?.agentDetails != null) {
          this.agentDetails = resp.data.agentDetails;
          let ExpertInId: any = null;
          if (this.agentDetails.expertIn == "Residential") {
            ExpertInId = 1;
          }
          if (this.agentDetails.expertIn == "Commercial") {
            ExpertInId = 2;
          }
          if (this.agentDetails.expertIn == "Both") {
            ExpertInId = 3;
          }
          if (this.agentDetails.userId == null || this.agentDetails.userId == undefined) {
            this.agentDetails.userId = this.userId
          }
          let tempAreas: any = []
          this.agentDetails.agentAreas.forEach((x: any) => {
            tempAreas.push(x.districtId)
          })
          tempAreas.sort((a: any, b: any) => (a > b) ? 1 : -1)
          console.log(tempAreas)
          this.ExpertInName = this.agentDetails.expertIn;
          this.agentDetailForm.patchValue({
            agentAboutMe: this.agentDetails.aboutMe,
            agentBrnNo: this.agentDetails.brnNo,
            expertIn: ExpertInId,
            nationalityId: this.agentDetails.nationalityId,
            id: this.agentDetails.id,
            userId: this.agentDetails.userId,
            areas: tempAreas,
            linkedIn: this.agentDetails.linkedIn,
            experience: this.agentDetails.experience,
          })
          if (this.agentDetails.agentLanguages?.length > 0) {
            for (let item of this.agentDetails.agentLanguages) {
              this.agentLanguages.push(item.spokenLanguageId);
            }
          }

          if (this.agentDetails.documents?.length > 0) {
            this.agentDetails.documents.sort((a: any, b: any) => (a.registrationDocumentTypeId > b.registrationDocumentTypeId) ? 1 : -1)
            for (let item of this.agentDetails.documents) {
              this.agentFileNames.push(item.fileName);
              this.finalAgentDocments.push({
                "FileId": item.fileId,
                "RegistrationDocumentTypeId": item.registrationDocumentTypeId,
                "FileName": item.fileName, "Extension": item.extension, "FileUrl": item.fileUrl,
                "Id": item.id
              });
            }
          }
          //set agent company detail
          if (this.agentDetails?.company != null) {
            this.companyDetailForm.patchValue({
              id: this.agentDetails?.company?.id,
              companyName: this.agentDetails?.company?.companyName,
              aboutCompany: this.agentDetails?.company?.aboutCompany,
              tradeLicenseNo: this.agentDetails?.company?.tradeLicenseNo,
              premitNo: this.agentDetails?.company?.premitNo,
              ornNo: this.agentDetails?.company?.ornNo,
              reraNo: this.agentDetails?.company?.reraNo,
              companyAdress: this.agentDetails?.company?.companyAdress,
            })
            // this.companyDetailForm.controls['companyId']?.patchValue(this.agentDetails?.company?.id,{ emitEvent: false, onlySelf: true })
            if (this.agentDetails?.company?.documents?.length > 0) {
              this.agentDetails?.company?.documents.sort((a: any, b: any) => (a.registrationDocumentTypeId > b.registrationDocumentTypeId) ? 1 : -1)
              for (let item of this.agentDetails.company?.documents) {
                this.companyFileNames.push(item.fileName);
                this.finalCompanyDocments.push({
                  "FileId": item.fileId,
                  "RegistrationDocumentTypeId": item.registrationDocumentTypeId,
                  "FileName": item.fileName, "Extension": item.extension, "FileUrl": item.fileUrl,
                  "Id": item.id
                });
              }
            }
          }
        }
        this.showLoader = false;
      },
      error: (err: any) => {
        this.showLoader = false;
      }
    })
  }
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
    this.page = 1;
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
    this.showLoader=true;
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

        let rentTypeName: any = '';
        if (element.rentType != null && element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null && element.propertyListingTypeId != 2) {
          rentTypeName = '/' + element.rentType.name
        }

        let propertyType: any = '';
        if (element.propertyType !== null && element.propertyType !== undefined) {
          propertyType = element.propertyType.typeDescription
        }
        let companyLogoImage = '';
        if (element.company != null && element.company?.documents.length > 0) {
          let companyLogo = element.company?.documents.find((y: any) => {
            return y.registrationDocumentTypeId === 8
          })
          if (companyLogo != null && companyLogo != undefined) {
            companyLogoImage = this.baseUrl + companyLogo.fileUrl;
          }
        }
        tempData.push(
          {
            propertyTitle: element.propertyTitle,
            rentType: element.rentType,
            rentTypeName: rentTypeName,
            propertyType: propertyType,
            currency: element.country.currency,
            price: element.propertyPrice,
            favorite: element.favorite,
            id: element.id,
            src: image,
            bedrooms: element.bedrooms,
            propertyAddress: element.propertyAddress,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
            buildupArea: element.buildupArea,
            plotSize: element.plotSize,
            requestedDateFormat: element.requestedDateFormat,
            furnishingType: element.furnishingType,
            companyLogoImage:companyLogoImage,
            documents:element.documents
          });
      })
    });
    setTimeout(() => {
      this.wishlistingData = tempData
      this.showLoader=false;
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
  allFormCheckbox(data:any) {
    console.log("checck",data)
    this.allCheckbox.push({ 'id': data.id,'documents':data.documents,'propertyPrice':data.price,'currency':data.currency,
  'rentType':data.rentType,'propertyTitle':data.propertyTitle,'propertyAddress':data.propertyAddress
  })
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
        localStorage.removeItem("clickProprtyOne");
        localStorage.removeItem("clickProprtyTwo");
        localStorage.removeItem("clickProprtyThree");
        this.allCheckbox.forEach((x:any,i:any)=>{
          let name:string="clickProprty";
          if(i==0){
            name=name+"One";
          }
          if(i==1){
            name=name+"Two";
          }
          if(i==2){
            name=name+"Three";
          }
          localStorage.setItem(name,JSON.stringify(x));
        })
       // localStorage.setItem('compareIds', JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/compare/view');
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
        let companyLogoImage = '';
        if (element.company != null && element.company?.documents.length > 0) {
          let companyLogo = element.company?.documents.find((y: any) => {
            return y.registrationDocumentTypeId === 8
          })
          if (companyLogo != null && companyLogo != undefined) {
            companyLogoImage = this.baseUrl + companyLogo.fileUrl;
          }
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
            furnishingType: element.furnishingType,
            companyLogoImage:companyLogoImage
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
    let temp: any = {};
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
    this.service.PointPayment(temp).subscribe((result: any) => {
      if (result.message == "Purchasing Point is completed successfully") {
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
  deletePhoto() {
    let temp: any = localStorage.getItem("user");
    temp = JSON.parse(temp);
    let imageData = new FormData();
    imageData.append("ProfileRequest", JSON.stringify({ "Id": temp.id }))
    this.service.UpdateImage(imageData).subscribe((result: any) => {
      if (result.message == "User  fetched successfully") {
        localStorage.setItem("user", JSON.stringify(result.data));
        this.proAvatar = '../../assets/images/user.png';
      }
    })
  }
  goToPayment() {
    localStorage.setItem("comingFrom", "dashboard");
    this.route.navigate(["/payment-packages"]);
  }
  openVerticallyCentered(sharecontent: any) {
    this.modalService.open(sharecontent, { centered: true });
  }
  UpdatedSuccessfully(UpdatedContentPhone: any) {
    this.modalService.open(UpdatedContentPhone, { centered: true });
  }
  deleteListing(e: any) {
    this.deleteID = e;
    this.confirmMessage = "Are you sure you want to delete this property? This action cannot be undone.";
    this.showConfirm = true;
  }
}
