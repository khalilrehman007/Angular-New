import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PropertyfilterComponent } from '../../propertyfilter/propertyfilter.component';
import { AppService } from 'src/app/service/app.service';
import {ActivatedRoute, Router} from "@angular/router";
declare const google: any;

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit,AfterViewInit{
  videotiour ='../../../assets/images/icons/video-tour.svg'
  lsitedby ='../../../assets/images/icons/listed-by.svg'
  ovverified ='../../../assets/images/icons/ov-verified.svg'
  homelocationsvg = '../../../assets/images/home-location.svg'
  bedsvg = '../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../assets/images/icons/Bath-tub.svg'
  squaremetersvg = '../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../assets/images/better-home.svg'
  locations: any;
  autocomplete: any;
  marker: any;
  map: any;
  page:number = 1;
  totalRecord:any = 0;
  baseUrl = 'https://beta.ovaluate.com/'

  @ViewChild('mapView') mapElement: any;

  dynamicSlides1 = [
    {
      id: 'slide1',
      src:'../../../assets/images/property/1.png',
      alt:'Side 1',
      title:'Side 1',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide2',
      src:'../../../assets/images/property/1.png',
      alt:'Side 2',
      title:'Side 2',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide3',
      src:'../../../assets/images/property/1.png',
      alt:'Side 3',
      title:'Side 3',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide4',
      src:'../../../assets/images/property/1.png',
      alt:'Side 4',
      title:'Side 4',
      price:"250,000AED",
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
  constructor( private service: AppService,private activeRoute: ActivatedRoute,private route: Router) {
    this.totalRecord = this.activeRoute.snapshot.queryParamMap.get('totalRecord');
    this.selectedPropertyTypeName = this.activeRoute.snapshot.queryParamMap.get('selectedPropertyTypeName');
    this.type = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    this.PropertyTypeIds = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeIds');
    this.PropertyAddress = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');
    let DistrictsId: any = this.activeRoute.snapshot.queryParamMap.get('DistrictIds');
    let DistrictsValue: any = this.activeRoute.snapshot.queryParamMap.get('DistrictsValue');
    let KeyWords :any = this.activeRoute.snapshot.queryParamMap.get('KeyWords');
    let PropertyFeatureIds: any = this.activeRoute.snapshot.queryParamMap.get('PropertyFeatureIds');
    let MinCarpetArea: any = this.activeRoute.snapshot.queryParamMap.get('MinCarpetArea');
    let MaxCarpetArea: any = this.activeRoute.snapshot.queryParamMap.get('MaxCarpetArea');
    let FurnishingTypeId: any = this.activeRoute.snapshot.queryParamMap.get('FurnishingTypeId');
    let cityID: any = this.activeRoute.snapshot.queryParamMap.get('cityID') ?? "";
    let countryId: any = this.activeRoute.snapshot.queryParamMap.get('countryId') ?? "";
    this.Bedrooms   = this.activeRoute.snapshot.queryParamMap.get('Bedrooms');
    this.Bathrooms  = this.activeRoute.snapshot.queryParamMap.get('Bathrooms');

    this.KeyWords = JSON.parse(KeyWords)
    this.PropertyFeatureIds = JSON.parse(PropertyFeatureIds)
    this.MinCarpetArea = MinCarpetArea
    this.MaxCarpetArea = MaxCarpetArea
    this.FurnishingTypeId = FurnishingTypeId

    this.DistrictsId = JSON.parse(DistrictsId)
    this.DistrictsValue = JSON.parse(DistrictsValue)

    let propertyParams :any =localStorage.getItem('listingForMap');
    this.propertyDetailsParams = JSON.parse(propertyParams)
    console.log(this.propertyDetailsParams,'dededede');
    this.loadListingProperty(this.propertyDetailsParams)

    this.service.VideoTour().subscribe((result: any) => {
      this.videoTour = result.data;
    })
    this.LoadPropertySortBy();

  }


  searchListing: any = [];
  loadListingProperty(data: any) {
    let tempData: Array<Object> = []
    this.service.LoadSearchListing(data).subscribe((response: any) => {
      this.totalRecord = response.data.totalRecord;
      response.data.propertyListings.forEach((element, i) => {
        let rentTypeName = ''
        if (element.rentType != null) {
          rentTypeName = element.rentType.name
        }
        let documents: any = 'assets/images/placeholder.png'
        if (element.documents != undefined && element.documents.length > 1) {
          documents = this.baseUrl+element.documents[0].fileUrl
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
            buildupArea: element.buildupArea,companyName:element.companyName,propertyLat:element.propertyLat,propertyLong:element.propertyLong,
            id: element.id, favorite: element.favorite, userImage: userImage, fullName: fullName, userId: userId,
            StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.avgRentPrice, RecentRentTxns: element.recentRentTxns,
            documents: documents, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat, brokerageChargePrice: element.brokerageChargePrice, securityDepositPrice: element.securityDepositPrice,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency, propertyCode: element.propertyCode
          }
        );
      })
      this.searchListing = tempData;
      this.initMap(null, 6);

    });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }
  pageChanged(value: any) {
    this.page = value;
    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page, DistrictIds: this.DistrictsId
    }

    this.loadListingProperty(params);

  }
  initMap(e: any, zoom: any) {
    this.map = new google.maps.Map($(".mapView")[0], {
      center: { "lat": 23.4241, "lng": 53.8478 },
      zoom: zoom,
      disableDefaultUI: true,
    })
    this.marker = new google.maps.Marker({
      position: { "lat": 23.4241, "lng": 53.8478 },
      map: this.map
    })

    console.log(this.searchListing.length)
    for (let i = 0; i < this.searchListing.length; i++) {

      console.log(this.searchListing[i].propertyLat,'property lat log');
      let latLng = {lat: this.searchListing[i].propertyLat, lng: this.searchListing[i].propertyLong};
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map
    })

      // marker.setMap(this.map)
    }

  }


  videoSorting(event: any) {
    this.videoTourSorting = event.value
    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
      "PropertyListingTypeId": this.PropertyListingTypeId, "videoSorting": this.videoTourSorting, CurrentPage: this.page, DistrictIds: this.DistrictsId
    }
    this.loadListingProperty(params);
  }

  sortedBy(event) {
    this.sortedById = event.value
    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
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
    let params: any = {
      type: '', "PropertyTypeIds": [], "PropertyAddress": '', "RentTypeId": '',
      "PropertyCategoryId": '', PriceStart: '', PriceEnd: '', Bedrooms: '', Bathrooms: '',
      "PropertyListingTypeId": '', CurrentPage: 1
    }
    this.route.navigate(['/search'], { queryParams: params })
    this.loadListingProperty(params);
  }
}
