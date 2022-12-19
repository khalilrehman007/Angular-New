import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";
import { AuthService } from "../../service/auth.service";
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MapStyle } from 'src/app/shared/map.retro.style';
declare const google: any;

@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.component.html',
  styleUrls: ['./viewmap.component.scss']
})
export class ViewmapComponent implements OnInit {
  videotiour = '../../../assets/images/icons/video-tour.svg'
  lsitedby = '../../../assets/images/icons/listed-by.svg'
  ovverified = '../../../assets/images/icons/ov-verified.svg'
  homelocationsvg = '../../../assets/images/home-location.svg'
  bedsvg = '../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../assets/images/icons/Bath-tub.svg'
  squaremetersvg = '../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../assets/images/better-home.svg'
  locations: any;
  autocomplete: any;
  marker: any;
  map: any;
  page: number = 1;
  totalRecord: any = 0;
  baseUrl = environment.apiUrl;

  @ViewChild('mapView') mapElement: any;

 
  dynamicSlides1 = [
    {
      id: 'slide1',
      src: '../../../assets/images/property/1.png',
      alt: 'Side 1',
      title: 'Side 1',
      price: "250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide2',
      src: '../../../assets/images/property/1.png',
      alt: 'Side 2',
      title: 'Side 2',
      price: "250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide3',
      src: '../../../assets/images/property/1.png',
      alt: 'Side 3',
      title: 'Side 3',
      price: "250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide4',
      src: '../../../assets/images/property/1.png',
      alt: 'Side 4',
      title: 'Side 4',
      price: "250,000AED",
      link: 'PropertDetailsPage'
    }
  ]
  propertyDetailsParams: any;
  type: any;
  PropertyCategoryId: any;
  RentTypeId: any;
  PropertyListingTypeId: any;
  PropertyTypeIds: any;
  PropertyAddress: any;
  PriceStart: any;
  PriceEnd: any;
  content: any;
  sortedById: any;
  totalLength: number = 0;
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
  selectedPropertyTypeName: any;
  constructor(private decimalPipe: DecimalPipe,private currentLocation: Location,private authService: AuthService, private notifyService: NotificationService, private service: AppService, private activeRoute: ActivatedRoute, private route: Router,private modalService: NgbModal) {
    $(window).scrollTop(0);
    this.totalRecord = this.activeRoute.snapshot.queryParamMap.get('totalRecord');
    this.selectedPropertyTypeName = this.activeRoute.snapshot.queryParamMap.get('selectedPropertyTypeName');
    this.type = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    let PropertyTypeIds: any = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeIds');
    this.PropertyTypeIds = JSON.parse(PropertyTypeIds)
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
    if (PropertyFeatureIds == null) {
      PropertyFeatureIds = []
    } else {
      PropertyFeatureIds = JSON.parse(PropertyFeatureIds)
    }
    this.PropertyFeatureIds = PropertyFeatureIds
    this.KeyWords = JSON.parse(KeyWords)
    this.MinCarpetArea = MinCarpetArea
    this.MaxCarpetArea = MaxCarpetArea
    this.FurnishingTypeId = FurnishingTypeId
    this.DistrictsId = JSON.parse(DistrictsId)
    this.DistrictsValue = JSON.parse(DistrictsValue)
    let propertyParams: any = localStorage.getItem('listingForMap');
    this.propertyDetailsParams = JSON.parse(propertyParams)
    this.loadListingProperty(this.propertyDetailsParams)
    this.service.VideoTour().subscribe((result: any) => {
      this.videoTour = result.data;
    })
    this.LoadPropertySortBy();
    this.getUser();
    let userId = '';
    if (this.user !== null) {
      userId = this.user.id;
    }
    this.userId = userId;
  }
  childToParentDataLoad(data: any) {
    let response: any = data
    this.type = response.type
    this.PropertyCategoryId = response.PropertyCategoryId
    this.Bedrooms = response.Bedrooms
    this.Bathrooms = response.Bathrooms
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
    this.loadListingProperty(data);
  }
  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  searchListing: any = [];
  loadListingProperty(data: any) {
    let tempData: Array<Object> = []
    this.service.LoadSearchListing(data).subscribe((response: any) => {
      console.log("resss",response);
      this.totalRecord = response.data.totalRecord;
      response.data.propertyListings.forEach((element:any, i:any) => {
        let rentTypeName = ''
        if (element.rentType != null) {
          rentTypeName = element.rentType.name
        }
        let documents: any = 'assets/images/placeholder.png'
        if (element.documents != undefined && element.documents.length > 0) {
          documents = this.baseUrl + element.documents[0].fileUrl
        }
        let userImage = '../assets/images/user.png'
        let fullName = ''
        let userId = ''
        if (element.user != null && element.user !== undefined) {
          userImage = this.baseUrl + element.user.imageUrl
          fullName = element.user.fullName
          userId = element.user.id
        }
        tempData.push(
          {
            buildupArea: element.buildupArea, plotSize:element.plotSize, companyName: element.companyName, propertyLat: element.propertyLat, propertyLong: element.propertyLong,
            id: element.id, favorite: element.favorite, userImage: userImage, fullName: fullName, userId: userId,
            StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.avgRentPrice, RecentRentTxns: element.recentRentTxns,
            documents: documents, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat, brokerageChargePrice: element.brokerageChargePrice, securityDepositPrice: element.securityDepositPrice,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency, 
            propertyCode: element.propertyCode,unitType:element.country.unitType,package:element.package
          }
        );
      })
      this.searchListing = tempData;
      this.initMap(null, 10);

    });
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }
  pageChanged(value: any) {
    this.page = value;
    // let params: any = {
    //   "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,"videoTour": this.videoTourSorting,
    //   "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
    //   "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
    // }
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId,
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, "videoTour": this.videoTourSorting,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId,
    }
    this.loadListingProperty(params);
  }
  initMap(e: any, zoom: any) {
    let centerPosition:any;
    if(this.searchListing.length!=0){
      centerPosition={'lat':this.searchListing[0].propertyLat,'lng':this.searchListing[0].propertyLong}
    }
    else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            centerPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
        );
      }
    }

    this.map = new google.maps.Map($(".mapView")[0], {
      center:centerPosition,
      zoom: zoom,
      disableDefaultUI: true,
    })
    //this.map.setOptions({ styles: MapStyle.retro});
    for (let i = 0; i < this.searchListing.length; i++) {
      const contentString =`<div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div class="add-compare-div add-compare-div-first">
              <div ngClass="property-comparison-block position-relative">
                  <div ngClass="com-img cursor-pointer">
                      <img class="marker-img-style" src="${this.searchListing[i].documents}">
                  </div>
                  <div ngClass="com-cntnt cursor-pointer">
                      <h4> ${this.decimalPipe.transform(this.searchListing[i].propertyPrice)} ${this.searchListing[i].currency}  
                      </h4>
                      <address>
                           <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M8.26455 0.949341C3.9992 0.949341 0.529114 4.41942 0.529114 8.68478C0.529114 10.4448 1.10589 12.1023 2.19711 13.4782C3.61003 15.2597 7.71886 19.4895 7.89306 19.6687L8.2645 20.0508L8.63599 19.6687C8.81029 19.4895 12.9204 15.2587 14.3335 13.4766C15.4237 12.1019 16 10.4449 16 8.68478C16 4.41942 12.5299 0.949341 8.26455 0.949341ZM13.5215 12.8328C12.3839 14.2673 9.32888 17.4585 8.26455 18.5622C7.20032 17.4585 4.14635 14.2683 3.00901 12.8343C2.06457 11.6434 1.56536 10.2086 1.56536 8.68478C1.56536 4.99081 4.57059 1.98559 8.26455 1.98559C11.9585 1.98559 14.9637 4.99081 14.9637 8.68478C14.9637 10.2087 14.465 11.6431 13.5215 12.8328Z" fill="#645BD1"/>
                                          <path d="M8.26478 4.02002C5.73996 4.02002 3.68591 6.07407 3.68591 8.59889C3.68591 11.1237 5.74002 13.1778 8.26478 13.1778C10.7895 13.1778 12.8437 11.1237 12.8437 8.59889C12.8437 6.07412 10.7896 4.02002 8.26478 4.02002ZM8.26478 12.1415C6.31135 12.1415 4.72216 10.5523 4.72216 8.59889C4.72216 6.64546 6.3114 5.05627 8.26478 5.05627C10.2182 5.05627 11.8074 6.64551 11.8074 8.59889C11.8074 10.5523 10.2182 12.1415 8.26478 12.1415Z" fill="#645BD1"/>
                          </svg>  
                          ${this.searchListing[i].propertyAddress}</address>
                          <a style="font-size:16px" href="/property/detail?id=${this.searchListing[i].id}">View Listing</a>
                  </div>
              </div>
          </div>
      </div>`;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

      let latLng = { lat: this.searchListing[i].propertyLat, lng: this.searchListing[i].propertyLong };
      this.marker = new google.maps.Marker({
        position: latLng,
        icon:"../../../assets/images/map-marker.png",
        map: this.map
      })
      this.marker.addListener("click", () => {
        infowindow.open({
          anchor: this.marker,
          map:this.map,
        });
      });
      // marker.setMap(this.map)
    }

  }
  NavigateToDetail(id:number){
    this.route.navigate(
      ['/property/detail'],
      { queryParams: { id: id } }
    );
  }
  LocationBack(){
    this.currentLocation.back();
  }
  videoSorting(event: any) {
    this.videoTourSorting = event.value
    // let params: any = {
    //   "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
    //   "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
    //   "PropertyListingTypeId": this.PropertyListingTypeId, "videoTour": this.videoTourSorting, CurrentPage: this.page, DistrictIds: this.DistrictsId
    // }
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId,
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyListingTypeId": this.PropertyListingTypeId, "videoTour": this.videoTourSorting, CurrentPage: this.page, DistrictIds: this.DistrictsId
    }
    this.loadListingProperty(params);
  }
  sortedBy(event:any) {
    this.sortedById = event.value
    // let params: any = {
    //   "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
    //   "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,"videoTour": this.videoTourSorting,
    //   "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
    // }
    let params: any = {
      MinCarpetArea: this.MinCarpetArea, MaxCarpetArea: this.MaxCarpetArea, PropertyFeatureIds: this.PropertyFeatureIds, KeyWords: this.KeyWords,
      FurnishingTypeId: this.FurnishingTypeId,
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, "videoTour": this.videoTourSorting,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
    }
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
    this.PropertyTypeIds        = []
    this.PropertyFeatureIds   = []

    let params: any = {
      type: '', "PropertyTypeIds": "[]", "PropertyAddress": '', "RentTypeId": '',
      "PropertyCategoryId": '', PriceStart: '', PriceEnd: '', Bedrooms: '', Bathrooms: '',
      "PropertyListingTypeId": '', CurrentPage: 1
    }
    let object: any = {
      type: '', "PropertyTypeIds": [], "PropertyAddress": '', "RentTypeId": '',
      "PropertyCategoryId": '', PriceStart: '', PriceEnd: '', Bedrooms: '', Bathrooms: '',
      "PropertyListingTypeId": '', CurrentPage: 1
    }

    this.route.navigate(['/property/mapview'], { queryParams: params })
    this.loadListingProperty(object);
  }
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
    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId, Bedrooms: this.Bedrooms, Bathrooms: this.Bathrooms,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd, "videoTour": this.videoTourSorting,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
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
  openVerticallyCentered(sharemodal: any) {
    this.modalService.open(sharemodal, { centered: true });
  }
}
