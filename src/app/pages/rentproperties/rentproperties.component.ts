import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PropertyfilterComponent } from '../../propertyfilter/propertyfilter.component';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../service/app.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rentproperties',
  templateUrl: './rentproperties.component.html',
  styleUrls: ['./rentproperties.component.scss']
})
export class RentpropertiesComponent implements OnInit {
  videotiour ='../../../assets/images/icons/video-tour.svg'
  lsitedby ='../../../assets/images/icons/listed-by.svg'
  ovverified ='../../../assets/images/icons/ov-verified.svg'
  order ='../../../assets/images/icons/ase-des.svg'
  heart ='../../../assets/images/blue-heart.svg'
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
  type :any;
  PropertyCategoryId :any;
  RentTypeId :any;
  PropertyListingTypeId :any;
  PropertyTypeIds :any;
  PropertyAddress :any;
  PriceStart :any;
  PriceEnd :any;
  content :any;
  baseUrl = 'https://beta.ovaluate.com/'
  sortedById: any;

  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router,private modalService: NgbModal) {
    this.type                  = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId    = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId            = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    this.PropertyTypeIds       = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeIds');
    this.PropertyAddress       = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart            = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd              = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');

    let params :any = {"PropertyTypeIds":this.PropertyTypeIds, "PropertyAddress":this.PropertyAddress,"RentTypeId":this.RentTypeId,
      "PropertyCategoryId":this.PropertyCategoryId,"PriceStart":this.PriceStart, "PriceEnd" : this.PriceEnd,
      "PropertyListingTypeId":this.PropertyListingTypeId,"SortedBy":this.sortedById
    }

    this.LoadPropertyCategories();
    this.loadListingProperty(params);
    this.LoadPropertySortBy();
  }

  PropertySortBy:any = []
  LoadPropertySortBy(){
    this.service.PropertySortBy().subscribe(e=>{
      let temp: any = e;
      for (let list of temp.data) {
        this.PropertySortBy.push({ name: list.name, id: list.id });
      }
    });
  }

  sortedBy(event) {
    this.sortedById = event.value
    let params :any = {"PropertyTypeIds":this.PropertyTypeIds, "PropertyAddress":this.PropertyAddress,"RentTypeId":this.RentTypeId,
      "PropertyCategoryId":this.PropertyCategoryId,"PriceStart":this.PriceStart, "PriceEnd" : this.PriceEnd,
      "PropertyListingTypeId":this.PropertyListingTypeId,"SortedBy":this.sortedById
    }
    this.loadListingProperty(params);
  }

  propertyTypes:any = []
  selectedPropertyTypeName :any;
  selectedPropertyTypeDiscription :any;
  LoadPropertyCategories(){
    this.service.PropertyCategories().subscribe(e=>{
      let temp: any = e;
      for (let list of temp.data) {
        if(this.selectedPropertyTypeName == null){
          if(list.id == this.PropertyCategoryId){
            this.selectedPropertyTypeName = list.categoryName;
            this.selectedPropertyTypeDiscription = list.details;
          }
        }
        this.propertyTypes.push({ name: list.categoryName, id: list.id });
      }
    });
  }

  childToParentDataLoad(data:any){
    console.log(data)
    this.loadListingProperty(data);
  }

  searchListing:any = [];
  loadListingProperty(data:any){
    let tempData :Array<Object> = []
    this.service.LoadSearchListing(data).subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {
        let image :any;
        let rentTypeName = ''
        if(element.rentType != null){
          rentTypeName = element.rentType.name
        }
        if(element.documents.length > 1){
          image = element.documents[0].fileUrl
        }
        tempData.push(
          {
            documents:element.documents,propertyFeatures:element.propertyFeatures,propertyType:element.propertyType,
            propertyTitle: element.propertyTitle, propertyAddress: element.propertyAddress, img:this.baseUrl+image,
            buildingName: element.buildingName,bedrooms: element.bedrooms,bathrooms: element.bathrooms,carpetArea: element.carpetArea,
            unitNo: element.unitNo,totalFloorgit: element.totalFloor,floorNo: element.floorNo,propertyDescription: element.propertyDescription,
            requestedDate: element.requestedDate,furnishingType: element.furnishingType,propertyPrice: element.propertyPrice,
            requestedDateFormat:element.requestedDateFormat,brokerageChargePrice:element.brokerageChargePrice,securityDepositPrice:element.securityDepositPrice,
            expiredDateFormat:element.expiredDateFormat,rentType:rentTypeName,currency:element.country.currency,propertyCode:element.propertyCode
          }
        );
      })
    });
    this.searchListing = tempData

    // console.log(this.searchListing,'listing')
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
  }

}
