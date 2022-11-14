import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { NotificationService } from "../../../service/notification.service";
import { AuthService } from "../../../service/auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  homelocationsvg = '../../../../../assets/images/home-location.svg'
  bedsvg = '../../../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../../../assets/images/home-location.svg'
  squaremetersvg = '../../../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../../../assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  exploreimg = '../../../../../assets/images/Blog-Tile.png'
  restaurant = '../../../../../assets/images/icons/restaurant.svg'
  exploredemo = '../../../../../assets/images/explore-demo.png'
  dubaigv = 'assets/images/goverment-of-dubai.png'
  landdept = 'assets/images/Dubai-Land-LOGO.png'
  rera = 'assets/images/rera.png'
  tagicn= '../../../../assets/images/icons/tag-icn.svg'
  baseUrl = 'https://beta.ovaluate.com/'
  blogs: any;
  content: any
  submitted = false;
  responsedata: any;
  dynamicSlides1: any = [];
  // dynamicSlides2: any = [];
  commercialdynamicSlides: any = [];
  // commercialdynamicSlides2: any = [];
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
    let tempData: Array<Object> = []
    this.service.PropertiesListingResidentialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "1", "UserId": this.userId }).subscribe(data => {
      this.propertyDetails = data;
      this.propertyDetails = this.propertyDetails.data;

      this.propertyDetails.forEach((element:any, i:any) => {
        let image = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        }
        let rentType: any = ''
        if (element.rentType != undefined && element.rentType.nameAr != undefined && element.rentType.nameAr != null) {
          rentType = '/ '+element.rentType.nameAr
        }
        tempData.push(
          {
            title: element.propertyTitle,
            rentType: rentType,
            currency: element.country.currencyAr,
            price: element.propertyPrice,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            propertyAddress: element.propertyAddressArabic,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
          });
      })
      this.dynamicSlides1 = tempData
    });
  }
  newData1() {
    let tempData: Array<Object> = []
    this.service.PropertiesListingResidentialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "2", "UserId": this.userId }).subscribe(data => {
      this.propertyDetails = data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element:any, i:any) => {
        let image = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        }
        let rentType: any = ''
        // if (element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null) {
        //   rentType = '/ '+element.rentType.name
        // }
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: rentType,
            currency: element.country.currencyAr,
            propertyAddress: element.propertyAddressArabic,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
          });
      })
      this.dynamicSlides1 = tempData
    });
  }

  oldData2() {
    let tempData: Array<Object> = []
    this.service.PropertiesListingCommercialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "1", "UserId": this.userId }).subscribe(data => {
      this.propertyDetails = data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element:any, i:any) => {
        let image = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        }
        let rentType: any = ''
        if (element.rentType != undefined && element.rentType.nameAr != undefined && element.rentType.nameAr != null) {
          rentType = '/ '+element.rentType.nameAr
        }
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: rentType,
            currency: element.country.currencyAr,
            propertyAddress: element.propertyAddressArabic,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
          });
      })
      this.commercialdynamicSlides = tempData
    });
  }
  newData2() {
    let tempData: Array<Object> = []
    this.service.PropertiesListingCommercialByDistrict({ "DistictId": this.id, "PropertyListingTypeId": "2", "UserId": this.userId }).subscribe(data => {
      this.propertyDetails = data;
      this.propertyDetails = this.propertyDetails.data;
      this.propertyDetails.forEach((element:any, i:any) => {
        let image = 'assets/images/placeholder.png'
        if (element.documents.length > 1) {
          image = this.baseUrl + element.documents[0].fileUrl
        }
        let rentType: any = ''
        // if (element.rentType != undefined && element.rentType.name != undefined && element.rentType.name != null) {
        //   rentType = '/ '+element.rentType.name
        // }
        tempData.push(
          {
            title: element.propertyTitle,
            price: element.propertyPrice,
            rentType: rentType,
            currency: element.country.currencyAr,
            propertyAddress: element.propertyAddressArabic,
            id: element.id,
            alt: element.propertyTitle,
            src: image,
            bedrooms: element.bedrooms,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
          });
      })
      this.commercialdynamicSlides = tempData
    });
  }

  customOptions: OwlOptions = {
    rtl: true,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    autoWidth:false,
    pullDrag: true,
    dots: true,
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
    },
    nav: true
  }
  districtDetail: any = {};
  dataLoaded: boolean = false;
  userId: any;
  user: any

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private service: AppService, private notifyService: NotificationService,private modalService: NgbModal) {
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
            console.log(err);
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
  AddToFavorite(id: any, status: any, part: any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.router.navigate(['/ar/login'])
    }

    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.router.navigate(['/ar/login']);
    }

    this.service.FavoriteAddRemove(status, { "UserId": this.userId, "PropertyListingId": id }).subscribe(data => {
      let responsedata: any = data
      if (responsedata.message == "Favorite is Removed successfully") {
        this.wishlistStatus = "Favorite is Removed successfully"
        this.notifyService.showSuccess('Favorite is Removed successfully', "");
      } else {
        this.wishlistStatus = "Favorite is added successfully"
        this.notifyService.showSuccess('Favorite is added successfully', "");
      }
    });
    if (part == "resedential-old") {
      setTimeout(() => {
        this.oldData1();
      }, 1000);
    } else if (part == "resedential-new") {
      setTimeout(() => {
        this.newData1();
      }, 1000);
    } else if (part == "commercial-old") {
      setTimeout(() => {
        this.oldData2();
      }, 1000);
    } else if (part == "commercial-new") {
      setTimeout(() => {
        this.newData2();
      }, 1000);
    }
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
