import { Component, OnInit } from '@angular/core';
// import { PropertyfilterComponent } from '../../propertyfilter/propertyfilter.component';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../service/app.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from "../../service/notification.service";
import { AuthService } from "../../service/auth.service";
import { JsonpInterceptor } from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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
  logo = '../../../assets/images/logo.svg'
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
  type: any;
  PropertyCategoryId: any;
  RentTypeId: any;
  PropertyListingTypeId: any;
  PropertyTypeIds: any;
  PropertyAddress: any;
  PriceStart: any;
  PriceEnd: any;
  content: any;
  baseUrl = 'https://beta.ovaluate.com/'
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
  halfList:any = 0;
  constructor(private authService: AuthService, private notifyService: NotificationService, private activeRoute: ActivatedRoute, private service: AppService, private api: AppService, private route: Router, private modalService: NgbModal) {
    $(window).scrollTop(0);
    this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.type = this.activeRoute.snapshot.queryParamMap.get('type');
        this.PropertyCategoryId = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
        this.RentTypeId = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
        this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
        let PropertyTypeIds: any = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeIds');
        this.PropertyAddress = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
        this.PriceStart = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
        this.PriceEnd = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');
        let DistrictsId: any = this.activeRoute.snapshot.queryParamMap.get('DistrictIds');
        let DistrictsValue: any = this.activeRoute.snapshot.queryParamMap.get('DistrictsValue');
        let KeyWords: any = this.activeRoute.snapshot.queryParamMap.get('KeyWords');
        let PropertyFeatureIds: any = this.activeRoute.snapshot.queryParamMap.get('PropertyFeatureIds');
        let MinCarpetArea: any = this.activeRoute.snapshot.queryParamMap.get('MinCarpetArea');
        let MaxCarpetArea: any = this.activeRoute.snapshot.queryParamMap.get('MaxCarpetArea');
        let FurnishingTypeId: any = this.activeRoute.snapshot.queryParamMap.get('FurnishingTypeId');
        let cityID: any = this.activeRoute.snapshot.queryParamMap.get('cityID') ?? "";
        let countryId: any = this.activeRoute.snapshot.queryParamMap.get('countryId') ?? "";
        this.Bedrooms = this.activeRoute.snapshot.queryParamMap.get('Bedrooms');
        this.Bathrooms = this.activeRoute.snapshot.queryParamMap.get('Bathrooms');

        this.PropertyTypeIds = JSON.parse(PropertyTypeIds)

        this.KeyWordsParams = KeyWords;
        this.KeyWords = JSON.parse(KeyWords)
        this.PropertyFeatureIds = JSON.parse(PropertyFeatureIds)
        this.MinCarpetArea = MinCarpetArea
        this.MaxCarpetArea = MaxCarpetArea
        this.FurnishingTypeId = FurnishingTypeId

        this.DistrictsId = JSON.parse(DistrictsId)
        this.DistrictsValue = JSON.parse(DistrictsValue)

        if (this.type == null) {
          this.activeRoute.params.subscribe(params => {
            if (params['type'] == 'Buy') {
              this.PropertyListingTypeId = 2;
              this.type = 'Buy'
            } else if (params['type'] == 'Rent') {
              this.PropertyListingTypeId = 1;
              this.type = 'Rent';
            }
          });
        }
        let params: any = {
          "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
          "PropertyCategoryId": this.PropertyCategoryId, "CityID": cityID, "CountryID": countryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
          "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: 1, DistrictIds: this.DistrictsId,
          FurnishingTypeId: this.FurnishingTypeId, MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea,
          PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords
        }

        this.LoadPropertyCategories();
        this.loadListingProperty(params);
        this.LoadPropertySortBy();
        this.getUser();
        let userId = '';
        if (this.user !== null) {
          userId = this.user.id;
        }
        this.userId = userId;
        this.service.VideoTour().subscribe((result: any) => {
          this.videoTour = result.data;
        })
        this.api.TrendTitle(1).subscribe((result: any) => {
          this.trendTitle = result.data
        })
      }
    });
  }

  onTrendClick(typeID: any, titleID: any) {

    let temp: any = this.trendTitle[typeID].trendTitleDetail[titleID];
    let type: any;
    if (temp.propertyListingTypeId == 1) {
      type = "Rent";
    } else if (temp.propertyListingTypeId == 2) {
      type = "Buy";
    } else {
      type = "";
    }
    // let params: any = {
    //   queryParams: {
    //     type: type,
    //     PropertyListingTypeId: temp.propertyListingTypeId ?? "",
    //     CityID: temp.cityId ?? "",
    //     CountryId: temp.countryId ?? "",
    //     PropertyCategoryId: temp.propertyCategoryId ?? "",
    //     PropertyTypeIds: temp.propertyTypeId ?? "",
    //   }
    // }


    let propertyTypeId: any = [temp.propertyTypeId ?? ""]
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId, CityID: temp.cityId ?? "", CountryId: temp.countryId ?? "",
      "PropertyTypeIds": propertyTypeId, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyCategoryId": temp.propertyCategoryId ?? "", "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, "videoTour": this.videoTourSorting,
      "PropertyListingTypeId": temp.propertyListingTypeId ?? "", "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId,
    }
    this.loadListingProperty(params);
    // this.route.navigate(['/search'], params)
  }
  callNumberText = "Call Now"
  callNumber(text: any) {
    if (text == "Call Now") {
      this.callNumberText = "+9000000000"
    } else {
      this.callNumberText = "Call Now"
    }
  }

  allSearch() {

    this.type                 = ''
    this.PropertyCategoryId   = ''
    this.RentTypeId           = ''
    this.PropertyListingTypeId =''
    this.PropertyAddress       = ''
    this.PriceStart            = 10
    this.PriceEnd              = 50000000
    this.Bedrooms              = ''
    this.Bathrooms             =''
    this.MinCarpetArea         =''
    this.MaxCarpetArea        =''
    this.FurnishingTypeId     =''
    this.KeyWords             = []
    this.propertyTypes        = []
    this.PropertyFeatureIds   = []

    let params: any = {
      type: '', "PropertyTypeIds": [], "PropertyAddress": '', "RentTypeId": '',
      "PropertyCategoryId": '', PriceStart: '', PriceEnd: '', Bedrooms: '', Bathrooms: '',
      "PropertyListingTypeId": '', CurrentPage: 1
    }
    this.route.navigate(['/search'], { queryParams: params })
    this.loadListingProperty(params);
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
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId,
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, "videoTour": this.videoTourSorting,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId,
    }

    this.loadListingProperty(params);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sortedBy(event:any) {
    this.sortedById = event.value
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId,
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, "videoTour": this.videoTourSorting,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
    }

    this.loadListingProperty(params);
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

  propertyTypes: any = []
  selectedPropertyTypeName: any;
  selectedPropertyTypeDiscription: any;
  LoadPropertyCategories() {
    this.service.PropertyCategories().subscribe(e => {
      let temp: any = e;
      for (let list of temp.data) {
        if (this.selectedPropertyTypeName == null) {
          if (list.id == this.PropertyCategoryId) {
            this.selectedPropertyTypeName = list.categoryName;
            this.selectedPropertyTypeDiscription = list.details;
          }
        }
        this.propertyTypes.push({ name: list.categoryName, id: list.id });
      }
    });
  }

  childToParentDataLoad(data: any) {
    let response: any = data
    this.type = response.type
    this.PropertyCategoryId = response.PropertyCategoryId
    this.RentTypeId = response.RentTypeId
    this.PropertyListingTypeId = response.PropertyListingTypeId
    this.PropertyTypeIds = response.PropertyTypeIds
    this.PropertyAddress = response.PropertyAddress
    this.PriceStart = response.PriceStart
    this.PriceEnd = response.PriceEnd
    this.page = response.CurrentPage
    this.KeyWords = response.KeyWords
    this.PropertyFeatureIds = response.PropertyFeatureIds
    this.MinCarpetArea = response.MinCarpetArea
    this.MaxCarpetArea = response.MaxCarpetArea
    this.FurnishingTypeId = response.FurnishingTypeId
    this.videoTourSorting = response.videoTourSorting


    this.selectedPropertyTypeName = null
    this.LoadPropertyCategories();
    // this.loadListingProperty(data);
  }

  searchListing: any = [];
  totalRecord: any;
  loadListingProperty(data: any) {
    let tempData: Array<Object> = []
    this.service.LoadSearchListing(data).subscribe((response: any) => {
      this.totalRecord = response.data.totalRecord;
      setTimeout(() => {
        // localStorage.setItem('propertyListingTotalRecord', this.totalRecord);
        localStorage.setItem('listingForMap', JSON.stringify(data))
      }, 1000);

      response.data.propertyListings.forEach((element:any, i:any) => {
        let documentsCheck: any = true;
        let rentTypeName = ''
        if (element.rentType != null && this.PropertyListingTypeId != 2) {
          rentTypeName = element.rentType.name
        }
        let documents: any = []
        if (element.documents.length >= 1) {
          documents = element.documents
        } else {
          documentsCheck = false
        }

        let userImage = '../assets/images/user.png'
        let fullName = ''
        let userId = ''
        if (element.user != null && element.user !== undefined && element.user.imageUrl != null) {
          userImage = this.baseUrl + element.user.imageUrl
          fullName = element.user.fullName
          userId = element.user.id
        }

        tempData.push(
          {
            buildupArea: element.buildupArea,
            id: element.id, favorite: element.favorite, userImage: userImage, fullName: fullName, userId: userId,
            StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.avgRentPrice, RecentRentTxns: element.recentRentTxns,
            documents: documents, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, documentsCheck: documentsCheck,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat, brokerageChargePrice: element.brokerageChargePrice, securityDepositPrice: element.securityDepositPrice,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency, propertyCode: element.propertyCode
          }
        );
      })
      this.searchListing = tempData;
      this.halfList = Math.floor(this.searchListing.length / 2);
    });

  }

  modelPropertyPictures: any = []
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {

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

    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: 1, DistrictIds: this.DistrictsId
    }
    this.service.FavoriteAddRemove(status, { "UserId": this.userId, "PropertyListingId": id }).subscribe(data => {
      let responsedata: any = data
      if (responsedata.message == "Favorite is Removed successfully") {
        this.wishlistStatus = "Favorite is Removed successfully"
        this.notifyService.showSuccess('Favorite is Removed successfully', "");
        setTimeout(() => {
          this.loadListingProperty(params);
        }, 1000);
      } else {
        this.wishlistStatus = "Favorite is added successfully"
        this.notifyService.showSuccess('Favorite is added successfully', "");
        setTimeout(() => {
          this.loadListingProperty(params);
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

    let PropertyTypeIdsParams: any = JSON.stringify(this.PropertyTypeIds);
    let params: any = {
      type: this.type, "PropertyTypeIds": PropertyTypeIdsParams, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, PriceStart: this.PriceStart, PriceEnd: this.PriceEnd, totalRecord: this.totalRecord,
      Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms, selectedPropertyTypeName: this.selectedPropertyTypeName,
      "PropertyListingTypeId": this.PropertyListingTypeId, CurrentPage: 1, DistrictIds: JSON.stringify(this.DistrictsId),
      DistrictsValue: JSON.stringify(this.DistrictsValue), KeyWords: this.KeyWordsParams, PropertyFeatureIds: JSON.stringify(this.PropertyFeatureIds),
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, FurnishingTypeId: this.FurnishingTypeId
    }

    this.route.navigate(['/property/mapview'], { queryParams: params })

  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = !this.status2;
  }
}
