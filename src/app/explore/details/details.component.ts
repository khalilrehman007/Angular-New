import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { NotificationService } from "../../service/notification.service";
import { AuthService } from "../../service/auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,AfterViewInit {
  homelocationsvg = '../../../../assets/images/home-location.svg'
  bedsvg = '../../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../../assets/images/home-location.svg'
  squaremetersvg = '../../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../../assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  exploreimg = '../../../../assets/images/Blog-Tile.png'
  restaurant = '../../../../assets/images/icons/restaurant.svg'
  exploredemo = '../../../../assets/images/explore-demo.png'
  dubaigv = 'assets/images/goverment-of-dubai.png'
  landdept = 'assets/images/Dubai-Land-LOGO.png'
  rera = 'assets/images/rera.png'
  tagicn= '../../../assets/images/icons/tag-icn.svg'
  baseUrl = environment.apiUrl;
  countryData:any;
  blogs: any;
  submitted = false;
  responsedata: any;
  content: any;
  dynamicSlides1: any = [];
  dynamicSlides2: any = [];
  homebanners: any = [];
  transaction: any = [];
  country: any = [];
  clientFeedback: any = [];
  slider: any = [];
  status: boolean = true;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  status5: boolean = false;
  map: any;
  bounds: any = [];

  id: number = 1;
  propertyDetails: any;
  oldData1() {
    this.service.PropertiesListingResidentialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "1", "UserId": this.userId }).subscribe((resp:any) => {
      this.SetResidentialSlideData(resp.data);
    });
  }
  newData1() {
    this.service.PropertiesListingResidentialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "2", "UserId": this.userId }).subscribe((resp:any) => {
      this.SetResidentialSlideData(resp.data);
    });
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        clearInterval(a);
      }
    })
  }
  oldData2() {
    this.service.PropertiesListingCommercialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "1", "UserId": this.userId }).subscribe((resp:any) => {
      this.SetCommercialSlideData(resp.data)
    });
  }
  newData2() {
    this.service.PropertiesListingCommercialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "2", "UserId": this.userId }).subscribe((resp:any) => {
      this.SetCommercialSlideData(resp.data)
    });
  }

  SetResidentialSlideData(data: any) {
    console.log(data)
    this.dynamicSlides1 = [];
    data.forEach((element: any) => {
      let mainImage: any = 'assets/images/placeholder.png';
      if (element.documents != null && element.documents.length > 0) {
        mainImage = this.baseUrl + element.documents[0].fileUrl;
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
      this.dynamicSlides1.push({
        mainImage: mainImage, id: element.id, propertyPrice: element.propertyPrice, country: element.country, rentType: element.rentType,
        propertyTitle: element.propertyTitle, requestedDateFormat: element.requestedDateFormat, numberOfUsershortListedProperty: element.numberOfUsershortListedProperty,
        numberOfUserSeeingProperty: element.numberOfUserSeeingProperty, propertyAddress: element.propertyAddress, propertyType: element.propertyType,
        bedrooms: element.bedrooms, bathrooms: element.bathrooms, plotSize: element.plotSize, buildupArea: element.buildupArea, carpetArea: element.carpetArea,
        furnishingType: element.furnishingType, companyLogoImage: companyLogoImage, favorite: element.favorite, package: element.package,
        propertyListingTypeId:element.propertyListingTypeId,propertyCategoryId:element.propertyCategoryId
      })
    })
  }
  SetCommercialSlideData(data:any){
    this.dynamicSlides2 = [];
    data.forEach((element: any) => {
      let mainImage: any = 'assets/images/placeholder.png';
      if (element.documents != null && element.documents.length > 0) {
        mainImage = this.baseUrl + element.documents[0].fileUrl;
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
      this.dynamicSlides2.push({
        mainImage: mainImage, id: element.id, propertyPrice: element.propertyPrice, country: element.country, rentType: element.rentType,
        propertyTitle: element.propertyTitle, requestedDateFormat: element.requestedDateFormat, numberOfUsershortListedProperty: element.numberOfUsershortListedProperty,
        numberOfUserSeeingProperty: element.numberOfUserSeeingProperty, propertyAddress: element.propertyAddress, propertyType: element.propertyType,
        bedrooms: element.bedrooms, bathrooms: element.bathrooms, plotSize: element.plotSize, buildupArea: element.buildupArea, carpetArea: element.carpetArea,
        furnishingType: element.furnishingType, companyLogoImage: companyLogoImage, favorite: element.favorite, package: element.package,
        propertyListingTypeId:element.propertyListingTypeId,propertyCategoryId:element.propertyCategoryId
      })
    })
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: false,
    pullDrag: true,
    dots: true,
    nav:false,
    lazyLoad:false,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }
  districtDetail: any = {};
  dataLoaded: boolean = false;
  userId: any;
  user: any
  shareURL: any = "";
  shareURLTemp: any = "";
  whatsAppShareUrl: any = "";
  facebookShareUrl: any = "";
  twitterShareUrl: any = "";
  constructor(private domSanitizer: DomSanitizer,private authService: AuthService, private cookie: CookieService,private router: Router, private route: ActivatedRoute, private service: AppService, private notifyService: NotificationService,private modalService: NgbModal) {
    let temp: any = window.location.href;
    temp = temp.split("/");
    temp[1] = "//";
    temp[2] = temp[2] + "/";
    temp[3] = temp[3] + "/";
    temp.pop().toString().replaceAll(",", "");
    this.shareURL = temp.toString().replaceAll(",", "");
    this.shareURLTemp = this.shareURL;
    console.log(this.shareURL)
    $(window).scrollTop(0);
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.oldData2();
    this.oldData1();
    this.getUser();
    let userId = '';
    if (this.user !== null) {
      userId = this.user.id;
    }
    this.userId = userId;
    this.service.ExploreDistrict(this.id).subscribe((result: any) => {
      this.dataLoaded = true;
      this.districtDetail = result.data;
      this.bounds.push([this.districtDetail.southWestLng, this.districtDetail.southWestLat]);
      this.bounds.push([this.districtDetail.northEastLng, this.districtDetail.northEastLat]);
      this.map = new mapboxgl.Map({
        accessToken:  environment.mapbox.accessToken,
        container: 'explore-near-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [(parseFloat(this.districtDetail.northEastLng) + parseFloat(this.districtDetail.southWestLng)) / 2, (parseFloat(this.districtDetail.northEastLat) + parseFloat(this.districtDetail.southWestLat)) / 2],
        zoom: 11,
        maxBounds: this.bounds
      })
      let marker = new mapboxgl.Marker({ color: "#FF0000", draggable: true }).setLngLat([(parseFloat(this.districtDetail.northEastLng) + parseFloat(this.districtDetail.southWestLng)) / 2, (parseFloat(this.districtDetail.northEastLat) + parseFloat(this.districtDetail.southWestLat)) / 2]).addTo(this.map).setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(this.districtDetail.name)
      ).togglePopup();
      // get lat lng on marker drag end
      marker.on('dragend', (e: any) => {
        $.ajax({
          url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + e.target._lngLat.lng + "," + e.target._lngLat.lat + ".json?types=address&access_token=" + environment.mapbox.accessToken,
          // url: "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?types=address&access_token=" + environment.mapbox.accessToken,
          method: "get",
          contentType: false,
          processData: false,
          dataType: "json",
          success: (res: any) => {
            marker.remove();
            if (res.features.length > 0) {
              marker = new mapboxgl.Marker({ color: "#FF0000", draggable: true }).setLngLat([e.target._lngLat.lng, e.target._lngLat.lat]).addTo(this.map).setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(res.features[0].place_name)
              ).togglePopup();
            } else {
              marker = new mapboxgl.Marker({ color: "#FF0000", draggable: true }).setLngLat([e.target._lngLat.lng, e.target._lngLat.lat]).addTo(this.map);
            }
          },
          error: (err) => {
          }
        });
      });
    });
  }
  ngOnInit(): void {
  }
  Overview() {
    this.status = !this.status;
    this.status1 = false;
    this.status2 = false;
    this.status3 = false;
  }
  NearBy() {
    this.status = false;
    this.status1 = !this.status1;
    this.status2 = false;
    this.status3 = false;
  }
  ResPro() {
    this.status = false;
    this.status1 = false;
    this.status2 = !this.status2;
    this.status3 = false;
  }
  ComPro() {
    this.status = false;
    this.status1 = false;
    this.status2 = false;
    this.status3 = !this.status3;
  }
  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }

  wishlistStatus: any;
  AddToFavorite(id: any, status: any, listingTypeId: any,categoryId:any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.router.navigate(['/login'])
    }

    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.router.navigate(['login']);
    }
const promise=new Promise((resolve,reject)=>{
  this.service.FavoriteAddRemove(status, { "UserId": this.userId, "PropertyListingId": id }).subscribe(data => {
    let responsedata: any = data
    if (responsedata.message == "Favorite is Removed successfully") {
      this.wishlistStatus = "Favorite is Removed successfully"
      this.notifyService.showSuccess('Favorite is Removed successfully', "");
    } else {
      this.wishlistStatus = "Favorite is added successfully"
      this.notifyService.showSuccess('Favorite is added successfully', "");
    }
    resolve(true);
  });
})
    promise.then(()=>{
      if (listingTypeId==1 && categoryId==1) {
        this.oldData1();
    } else if (listingTypeId==2 && categoryId==1) {
        this.newData1();
    } else if (listingTypeId==1 && categoryId==2) {
        this.oldData2();
    } else if (listingTypeId==2 && categoryId==2) {
        this.newData2();
    }
    })
   
  }
  openVerticallyCentered(content: any, id: any) {
    this.shareURL += "property/detail?id=" + id;
    this.whatsAppShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://wa.me/?text=" + encodeURI(this.shareURL));
    this.facebookShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(this.shareURL) + "%3Futm_source%3Dfacebook%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
    this.twitterShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://twitter.com/intent/tweet?url=" + encodeURI(this.shareURL) + "%3Futm_source%3Dtwitter%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
    this.shareURL = this.shareURLTemp;
    this.modalService.open(content, { centered: true });
  }
}
