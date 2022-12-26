import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
// import { PropertyfilterComponent } from '../../propertyfilter/propertyfilter.component';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../service/app.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from "../../service/notification.service";
import { AuthService } from "../../service/auth.service";
import { JsonpInterceptor } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  videotiour = '../../../assets/images/icons/video-tour.svg'
  lsitedby = '../../../assets/images/icons/listed-by.svg'
  ovverified = '../../../assets/images/icons/ov-verified.svg'
  order = '../../../assets/images/icons/ase-des.svg'
  heart = '../../../assets/images/blue-heart.svg'
  homelocationsvg = '../../../assets/images/home-location.svg'
  bedsvg = '../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../assets/images/icons/Bath-tub.svg'
  squaremetersvg = '../../../assets/images/icons/Square Meters.svg'
  furnishing = '../../../assets/images/icons/furnishing.svg'
  betterhome = '../../../assets/images/better-home.svg'
  dots = '../../../assets/images/dots.svg'
  call = '../../../assets/images/icons/call.svg'
  whatsapp = '../../../assets/images/icons/whatsapp.svg'
  chat = '../../../assets/images/icons/chat.svg'
  videocall = '../../../assets/images/icons/video-call.svg'
  virtual = '../../../assets/images/icons/virtual-tour.svg'
  email = '../../../assets/images/icons/email.svg'
  populardark = '../../../assets/images/icons/Popular-dark.svg'
  popularlight = '../../../assets/images/icons/Popularlight.svg'
  mapview = '../../../assets/images/Mpa-view.png'
  loc = '../../../assets/images/icons/loc-icn.svg'
  twitter = '../../../assets/images/icons/twiiter-share.svg'
  qr = '../../../assets/images/icons/qr-share.svg'
  fb = '../../../assets/images/icons/fb-share.svg'
  share = '../../../assets/images/icons/share-1.png'
  emailhome = '../../../assets/images/icons/email-home.png'
  logo = '../../../assets/images/logo.png'
  eventlist = [
    {
      img: '../../../assets/images/slider.png',
    },
    {
      img: '../../../assets/images/slider.png',
    },
    {
      img: '../../../assets/images/slider.png',
    },
    {
      img: '../../../assets/images/slider.png',
    },
  ]
  filterParams: any = {};
  rawFilterParams: any = {};
  selectedPropertyTypeName: any = '';
  showRecentTransactions: boolean = false;
  showPriceRange: boolean = false;
  showAvgSqft: boolean = false;
  showDIDiv: boolean = true;
  type: any;
  countryData: any = {};
  PropertyCategoryId: any;
  RentTypeId: any;
  PropertyListingTypeId: any;
  PropertyTypeIds: any;
  PropertyAddress: any;
  PriceStart: any;
  PriceEnd: any;
  content: any;
  baseUrl = environment.apiUrl;
  sortedById: any;
  totalLength: number = 0;
  page: number = 1;
  videoTour: any;
  videoTourSorting: any;
  user: any
  userId: any;
  listingForMap: any = [];
  DistrictsId: any = [];
  DistrictsValue: any = [];
  KeyWords: any = []
  PropertyFeatureIds: any = []
  MinCarpetArea: any;
  MaxCarpetArea: any;
  FurnishingTypeId: any;
  trendTitle: any = [];
  Bedrooms: any;
  Bathrooms: any;
  KeyWordsParams: any;
  headingPropertyType: any = "Properties";
  halfList: any = 0;
  currency: any = "";
  showLoader: boolean = false;
  listingImage: any;
  whatsAppShareUrl: any = "";
  facebookShareUrl: any = "";
  twitterShareUrl: any = "";
  shareURL: any = "";
  shareURLTemp: any = "";
  constructor(private domSanitizer: DomSanitizer, private cookie: CookieService, private authService: AuthService, private notifyService: NotificationService, private activeRoute: ActivatedRoute, private service: AppService, private api: AppService, private route: Router, private modalService: NgbModal) {
    let temp: any = window.location.href;
    temp = temp.split("/");
    temp[1] = "//";
    temp[2] = temp[2] + "/";
    temp[3] = temp[3] + "/";
    temp.pop().toString().replaceAll(",", "");
    this.shareURL = temp.toString().replaceAll(",", "");
    this.shareURLTemp = this.shareURL
    $(window).scrollTop(0);
    this.LoadPropertySortBy();
    this.getUser();
    if (this.user !== null) {
      this.userId = this.user.id;
    }
    this.service.VideoTour().subscribe((result: any) => {
      this.videoTour = result.data;
    })

  }

  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.api.TrendTitle(this.countryData?.id).subscribe((result: any) => {
          this.trendTitle = result.data;
        })
        clearInterval(a);
      }
    })
  }

  ngOnInit(): void {
    this.service.searchParams.subscribe(params => {
      this.filterParams = {};
      this.rawFilterParams={};
      this.rawFilterParams=params;
      if (params.Type !== undefined && params.Type !== null) {
        this.type = params.Type;
        this.service.activeTab.next(params.Type.toLowerCase());
      }
      if (params.PropertyListingTypeId !== undefined && params.PropertyListingTypeId !== null) {
        this.filterParams.PropertyListingTypeId = params.PropertyListingTypeId;
      }
      if (params.Bedrooms !== undefined && params.Bedrooms !== null) {
        this.filterParams.Bedrooms = params.Bedrooms;
      }
      if (params.CountryId !== undefined && params.CountryId !== null) {
        this.filterParams.CountryId = params.CountryId;
      }
      if (params.Bathrooms !== undefined && params.Bathrooms !== null) {
        this.filterParams.Bathrooms = params.Bathrooms;
      }
      if (params.RentTypeId !== undefined && params.RentTypeId !== null) {
        this.filterParams.RentTypeId = params.RentTypeId;
      }
      if (params.PropertyCategoryId !== undefined && params.PropertyCategoryId !== null) {
        this.filterParams.PropertyCategoryId = params.PropertyCategoryId;
      }
      if (params.PriceStart !== undefined && params.PriceStart !== null) {
        this.filterParams.PriceStart = params.PriceStart;
      }
      if (params.PriceEnd !== undefined && params.PriceEnd !== null) {
        this.filterParams.PriceEnd = params.PriceEnd;
      }
      if (params.ProfessionalTypeId !== undefined && params.ProfessionalTypeId !== null) {
        this.filterParams.ProfessionalTypeId = params.ProfessionalTypeId;
      }
      if (params.FurnishingTypeId !== undefined && params.FurnishingTypeId !== null) {
        this.filterParams.FurnishingTypeId = params.FurnishingTypeId;
      }
      if (params.MinCarpetArea !== undefined && params.MinCarpetArea !== null) {
        this.filterParams.MinCarpetArea = params.MinCarpetArea;
      }
      if (params.MaxCarpetArea !== undefined && params.MaxCarpetArea !== null) {
        this.filterParams.MaxCarpetArea = params.MaxCarpetArea;
      }
      if (params.KeyWords !== undefined && params.KeyWords !== null) {
        this.filterParams.KeyWords = JSON.parse(params.KeyWords);
      }
      if (params.PropertyTypeIds !== undefined && params.PropertyTypeIds !== null) {

        this.filterParams.PropertyTypeIds = JSON.parse(params.PropertyTypeIds);
      }
      if (params.PropertyFeatureIds !== undefined && params.PropertyFeatureIds !== null) {
        this.filterParams.propertyFeatureIds = JSON.parse(params.PropertyFeatureIds);
      }
      if (params.CityIds !== undefined && params.CityIds !== null) {
        this.filterParams.CityIds = JSON.parse(params.CityIds);

      }
      if (params.DistrictIds !== undefined && params.DistrictIds !== null) {
        this.filterParams.DistrictIds = JSON.parse(params.DistrictIds);
      }
      if (this.filterParams.propertyCategoryId == 1) {
        this.selectedPropertyTypeName = 'Residential';
      }
      else if (this.filterParams.propertyCategoryId == 2) {
        this.selectedPropertyTypeName = 'Commercial';
      }
      this.loadListingProperty(this.filterParams);
    })
  }
  onTrendClick(data: any) {
    let params: any = {}
    if (data.propertyListingTypeId !== null && data.propertyListingTypeId !== undefined) {
      if (data.propertyListingTypeId == 1) {
        params.Type = 'Rent';
        params.PropertyListingTypeId = data.PropertyListingTypeId;
      }
      else {
        params.Type = 'Buy';
        params.PropertyListingTypeId = data.PropertyListingTypeId;
      }
    }
    if (data.countryId !== null && data.countryId !== undefined) {
      params.CountryId = data.countryId;
    }
    else {
      params.CountryId = this.countryData?.id;
    }
    if (data.propertyCategoryId !== null && data.propertyCategoryId !== undefined) {
      params.PropertyCategoryId = data.propertyCategoryId;
    }
    if (data.propertyTypeId !== null && data.propertyTypeId !== undefined) {
      params.PropertyTypeIds = JSON.stringify([data.propertyTypeId])
    }
    if (data.cityId !== null && data.cityId !== undefined) {
      params.CityIds = JSON.stringify([data.cityId]);
    }
    this.route.navigate(
      ['/property/search'],
      { queryParams: params }
    );
  }
 
  allSearch() {
    this.service.clearSearch.next(true);
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

  pageChanged(value: any) {

    this.page = value;
    this.filterParams.CurrentPage=this.page;

    this.loadListingProperty(this.filterParams);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sortedBy(event: any) {
    this.sortedById = event.value
    this.filterParams.SortedBy=this.sortedById;
    this.loadListingProperty(this.filterParams);
  }

  videoSorting(event: any) {
    this.videoTourSorting = event.value
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId,
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyListingTypeId": this.PropertyListingTypeId, "videoTour": this.videoTourSorting, CurrentPage: this.page, DistrictIds: this.DistrictsId
    }
    this.loadListingProperty(params);
  }

  searchListing: any = [];
  totalRecord: any;
  loadListingProperty(data: any) {
    if (this.user !== null && this.user !== undefined) {
      data.UserId = this.user.id;
    }
    this.showLoader = true;
    let tempData: Array<Object> = []
    this.service.LoadSearchListing(data).subscribe({
      next:(response: any) => {
        this.totalRecord = response.data.totalRecord;
        response.data.propertyListings.forEach((element: any, i: any) => {
          let documentsCheck: any = true;
          let rentTypeName = ''
          if (element.rentType != null && this.PropertyListingTypeId != 2) {
            rentTypeName = element.rentType.name
          }
          let documents: any = []
          if (element.documents?.length >= 0) {
            documents = element.documents
          } else {
            documentsCheck = false
          }
  
          let userImage = '../assets/images/user.png'
          let fullName = ''
          let userId = ''
          let userEmail = ''
          let userPhoneNumber = ''
          let userWhatsAppNumber = ''
          if (element.user != null && element.user !== undefined && element.user?.imageUrl != null) {
            userImage = this.baseUrl + element.user.imageUrl
          }
          if (element.user != null && element.user !== undefined) {
            fullName = element.user.fullName
            userId = element.user.id
            userEmail = "mailto:" + element.user.email
            userPhoneNumber = "tel:" + element.user.phoneNumber
            userWhatsAppNumber = "https://wa.me/" + element.user.phoneNumber?.replace("+", "");
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
          this.shareURL += "detail?id=" + element.id;
          this.whatsAppShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://wa.me/?text=" + encodeURI(this.shareURL));
          this.facebookShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(this.shareURL) + "%3Futm_source%3Dfacebook%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
          this.twitterShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://twitter.com/intent/tweet?url=" + encodeURI(this.shareURL) + "%3Futm_source%3Dtwitter%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
  
          tempData.push(
            {
              buildupArea: element.buildupArea,
              plotSize: element.plotSize,
              id: element.id, favorite: element.favorite, userImage: userImage, fullName: fullName, userId: userId,
              StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.rentAvgPriceSqft, RecentRentTxns: element.recentRentTxns,
              documents: documents, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType,
              propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, documentsCheck: documentsCheck,
              buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
              furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
              requestedDateFormat: element.requestedDateFormat,
              rentType: rentTypeName, listingTypeId: element.propertyListingTypeId, currency: element.country.currency, propertyCode: element.propertyCode,
              listingType: element.propertyListingTypeId == 1 ? "Rent" : "Sale", showRecentTransactions: this.showRecentTransactions,
              showAvgSqft: this.showAvgSqft, showPriceRange: this.showPriceRange, showDIDiv: this.showDIDiv,
              whatsAppShareUrl: this.whatsAppShareUrl, facebookShareUrl: this.facebookShareUrl, twitterShareUrl: this.twitterShareUrl,
              userEmail: userEmail, userWhatsAppNumber: userWhatsAppNumber,
              userPhoneNumber: userPhoneNumber
            }
          );
          this.shareURL = this.shareURLTemp
        })
        this.searchListing = tempData;
        console.log(this.searchListing);
        this.currency = response.data?.propertyListings[0]?.country.currency;
        this.halfList = Math.floor(this.searchListing.length / 2);
        this.showLoader = false;
      },
      error:(err:any)=>{
        this.showLoader = false;
      }
    }
    );
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }



  wishlistStatus: any;
  AddToFavorite(id: any, status: any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError("you don't have access", "");
      this.route.navigate(['login']);
    }

    this.service.FavoriteAddRemove(status, { "UserId": this.userId, "PropertyListingId": id }).subscribe(data => {
      let responsedata: any = data
      if (responsedata.message == "Favorite is Removed successfully") {
        this.wishlistStatus = "Favorite is Removed successfully"
        this.notifyService.showSuccess('Favorite is Removed successfully', "");
        setTimeout(() => {
          this.loadListingProperty(this.filterParams);
        }, 1000);
      } else {
        this.wishlistStatus = "Favorite is added successfully"
        this.notifyService.showSuccess('Favorite is added successfully', "");
        setTimeout(() => {
          this.loadListingProperty(this.filterParams);
        }, 1000);
      }
    });
  }


  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }

  viewMap() {
    this.route.navigate(['/property/mapview'], { queryParams: this.rawFilterParams })
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = !this.status2;
  }
  ngOnDestroy(): void {
    this.service.activeTab.next('')
  }
}
