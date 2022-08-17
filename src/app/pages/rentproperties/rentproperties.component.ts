import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PropertyfilterComponent } from '../../propertyfilter/propertyfilter.component';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../service/app.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from "../../service/notification.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-rentproperties',
  templateUrl: './rentproperties.component.html',
  styleUrls: ['./rentproperties.component.scss']
})


export class RentpropertiesComponent implements OnInit {
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

  constructor(private authService: AuthService, private notifyService: NotificationService, private activeRoute: ActivatedRoute, private service: AppService, private api: AppService, private route: Router, private modalService: NgbModal) {
    this.type = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    this.PropertyTypeIds = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeIds');
    this.PropertyAddress = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');

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
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: 1
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
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page
    }

    this.loadListingProperty(params);
  }

  sortedBy(event) {
    this.sortedById = event.value
    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: this.page
    }
    this.loadListingProperty(params);
  }

  videoSorting(event:any) {
    this.videoTourSorting = event.value
    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
      "PropertyListingTypeId": this.PropertyListingTypeId, "videoSorting": this.videoTourSorting, CurrentPage: this.page
    }
    console.log(params);
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

    this.selectedPropertyTypeName = null
    this.LoadPropertyCategories();
    this.loadListingProperty(data);
  }

  searchListing: any = [];
  totalRecord: any;
  loadListingProperty(data: any) {
    let tempData: Array<Object> = []
    this.service.LoadSearchListing(data).subscribe(data => {
      let response: any = data;
      this.totalRecord = response.data.totalRecord;
      response.data.propertyListings.forEach((element, i) => {
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
            id: element.id, favorite: element.favorite,
            StartRentPrice: element.startRentPrice, EndRentPrice: element.endRentPrice, AvgRentPrice: element.avgRentPrice, RecentRentTxns: element.recentRentTxns,
            documents: element.documents, propertyFeatures: element.propertyFeatures, propertyType: element.propertyType, user: element.user,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img: this.baseUrl + image,
            buildingName: element.buildingName, bedrooms: element.bedrooms, bathrooms: element.bathrooms, carpetArea: element.carpetArea,
            unitNo: element.unitNo, totalFloorgit: element.totalFloor, floorNo: element.floorNo, propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate, furnishingType: element.furnishingType, propertyPrice: element.propertyPrice,
            requestedDateFormat: element.requestedDateFormat, brokerageChargePrice: element.brokerageChargePrice, securityDepositPrice: element.securityDepositPrice,
            expiredDateFormat: element.expiredDateFormat, rentType: rentTypeName, currency: element.country.currency, propertyCode: element.propertyCode
          }
        );
        this.searchListing = tempData;
      })
    });

    console.log(this.searchListing, 'listing')
  }

  modelPropertyPictures: any = []
  openVerticallyCentered(content, data) {
    this.modelPropertyPictures = data
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
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    let params: any = {
      "PropertyTypeIds": this.PropertyTypeIds, "PropertyAddress": this.PropertyAddress, "RentTypeId": this.RentTypeId,
      "PropertyCategoryId": this.PropertyCategoryId, "PriceStart": this.PriceStart, "PriceEnd": this.PriceEnd,
      "PropertyListingTypeId": this.PropertyListingTypeId, "SortedBy": this.sortedById, CurrentPage: 1
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

}
