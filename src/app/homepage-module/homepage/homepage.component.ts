import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SliderModule } from 'primeng/slider';
import * as $ from 'jquery';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from 'src/app/service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';
import { AuthService } from "../../service/auth.service";
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  homelocationsvg = 'assets/images/home-location.svg'
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/icons/Bath-tub.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  brandimg = 'assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  dubaigv = 'assets/images/goverment-of-dubai.png'
  landdept = 'assets/images/Dubai-Land-LOGO.png'
  rera = 'assets/images/rera.png'
  tagicn = '../../../assets/images/icons/tag-icn.svg'
  fb = '../../../assets/images/icons/fb-share.svg'
  whatsapp = '../../../assets/images/icons/whatsapp.svg'
  twitter = '../../../assets/images/icons/twiiter-share.svg'
  content: any;
  baseUrl = environment.apiUrl;
  blogs: any;
  submitted = false;
  responsedata: any;
  dynamicSlides1: any = [];
  dynamicSlides2: any = [];
  homebanners: any = [];
  transaction: any = [];
  country: any = [];
  clientFeedback: any = [];
  slider: any = [];
  user: any
  countryData: any = "";
  id: any = 1;
  propertyDetails: any;
  showLoader: boolean = false;
  oldData1() {
    this.residentialLabel = this.Rent;
    this.showLoader = true;
    this.service.LatestPropertiesListingResidential({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "1" }).subscribe((response: any) => {
      this.SetResidentialSlideData(response.data);
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    });
  }
  newData1() {
    this.residentialLabel = "Sale";
    this.showLoader = true;
    this.service.LatestPropertiesListingResidential({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "2" }).subscribe((response: any) => {
      this.SetResidentialSlideData(response.data);
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    });
  }

  oldData2() {
    this.commercialLabel = this.Rent;
    this.showLoader = true;
    this.service.LatestPropertiesListingCommercial({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "1" }).subscribe((response: any) => {
      this.SetCommercialSlideData(response.data);
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    });
  }
  newData2() {
    this.commercialLabel = "Sale";
    this.showLoader = true;
    this.service.LatestPropertiesListingCommercial({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "2" }).subscribe((response: any) => {
      this.SetCommercialSlideData(response.data);
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    });
  }
  SetResidentialSlideData(data: any) {
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
        furnishingType: element.furnishingType, companyLogoImage: companyLogoImage, favorite: element.favorite, package: element.package
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
        furnishingType: element.furnishingType, companyLogoImage: companyLogoImage, favorite: element.favorite, package: element.package
      })
    })
  }
  tenantsslide = [
    {
      id: 'slide1',
      src: 'assets/images/icons/virtul-toor.svg',
      heading: 'Virtual home tour',
      desc: 'You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.',
      class: 'virtual-tour'
    },
    {
      id: 'slide2',
      src: 'assets/images/icons/best-deal.svg',
      heading: 'Find the best deal',
      desc: 'Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!',
      class: 'find-best-deal'
    },
    {
      id: 'slide3',
      src: 'assets/images/icons/ready-apply.svg',
      heading: 'Get ready to apply',
      desc: 'Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!',
      class: 'get-ready-apply'
    }
  ]
  Exploreplaces = [
    {
      src: 'assets/images/explore-places/1.jpg',
      heading: 'Al Barsha, Dubai',
      paragraph: 'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro...'
    },
    {
      src: 'assets/images/explore-places/2.jpg',
      heading: 'Business Bay, Dubai',
      paragraph: 'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro...'
    }
  ]
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: false,
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
  easyslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    center: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
  sellrentproperty: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  testimonialslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  categories: any;
  types: any;
  search = new FormGroup({
    Name: new FormControl(""),
    Type: new FormControl(""),
    RentalType: new FormControl("")
  })
  propertyType: any;
  Sale: any;
  SaleAr: any;
  Rent: any;
  RentAr: any;
  propertyCategory: any;
  categoryNameRes: any;
  categoryNameArRes: any;
  categoryNameCom: any;
  categoryNameArCom: any;
  categoryDetailRes: any;
  categoryDetailResAr: any;
  categoryDetailCom: any;
  categoryDetailComAr: any;
  // valuationTransactions: any;
  totalTransactions: any;
  totalSales: any;
  totalMortgages: any;
  userId: any;
  explorePlaces: any = [];
  trendTitle: any = [];
  shareURL: any = "";
  shareURLTemp: any = "";
  whatsAppShareUrl: any = "";
  facebookShareUrl: any = "";
  twitterShareUrl: any = "";
  residentialLabel: any = ""
  commercialLabel: any = ""
  constructor(private domSanitizer: DomSanitizer, private cookie: CookieService, private authService: AuthService, private service: AppService, private route: Router, private notifyService: NotificationService, private modalService: NgbModal) {
    let temp: any = window.location.href;
    temp = temp.split("/");
    temp[1] = "//";
    temp[2] = temp[2] + "/";
    temp[3] = temp[3] + "/";
    temp.pop().toString().replaceAll(",", "");
    this.shareURL = temp.toString().replaceAll(",", "");
    this.shareURLTemp = this.shareURL;
    localStorage.removeItem("bounds");
    localStorage.removeItem("currency");
    localStorage.removeItem("arabicAddress");
    localStorage.removeItem("propertyData");
    localStorage.removeItem("lng");
    localStorage.removeItem("address");
    localStorage.removeItem("lat");
    $(window).scrollTop(0);
    this.LoadPropertyCategories()
    this.getLoadFeedback();
    this.loadCountriesData();
    this.getOvaluateFeatures();
    this.getUser();
    let userId = '';
    if (this.user !== null) {
      userId = this.user.id;
    }
    this.userId = userId;
    this.service.PropertyListingTypes().subscribe(data => {
      this.propertyType = data;
      this.propertyType = this.propertyType.data;
      this.Sale = this.propertyType[1].name;
      this.SaleAr = this.propertyType[1].nameAr;
      this.Rent = this.propertyType[0].name;
      this.RentAr = this.propertyType[0].nameAr;
    });

    this.service.PropertyCategories().subscribe(data => {
      this.propertyCategory = data;
      this.propertyCategory = this.propertyCategory.data;
      this.categoryNameRes = this.propertyCategory[0].categoryName;
      this.categoryNameArRes = this.propertyCategory[0].categoryNameAr;
      this.categoryNameCom = this.propertyCategory[1].categoryName;
      this.categoryNameArCom = this.propertyCategory[1].categoryNameAr;
      this.categoryDetailRes = this.propertyCategory[0].details;
      this.categoryDetailResAr = this.propertyCategory[0].detailsAr;
      this.categoryDetailCom = this.propertyCategory[1].details;
      this.categoryDetailComAr = this.propertyCategory[1].detailsAr;
    });

    this.service.OvaluateOfferings().subscribe((result: any = []) => {
      this.slider = result.data;
    })
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.oldData2();
        this.oldData1();
        this.service.NearPlaces(this.countryData.id).subscribe((result: any) => {
          this.explorePlaces = result.data;
        });
        this.service.TrendTitle(this.countryData.id).subscribe((result: any) => {
          this.trendTitle = result.data
        });
        this.LoadBanners();
        this.ValuationTransactions();
        this.LoadBlogs();
        clearInterval(a);
      }
    })
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
    let propertyTypeId: any = [temp.propertyTypeId] ?? []

    let params: any = {
      queryParams: {
        type: type,
        PropertyListingTypeId: temp.propertyListingTypeId ?? "",
        CityID: temp.cityId ?? "",
        CountryId: temp.countryId ?? "",
        PropertyCategoryId: temp.propertyCategoryId ?? "",
        PropertyTypeIds: JSON.stringify(propertyTypeId)
      }
    };
    this.route.navigate(['/property/search'], params)
  }
  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }

  ValuationTransactions() {
    let tempData: Array<Object> = []
    this.service.ValuationTransactions(this.countryData.id).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        tempData.push(
          { key: element.key, value: element.value });
      })
    });
    this.transaction = tempData
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.dropdown-toggle').click(function () {
        $(this).next().toggleClass('active');
      });
    });
  }

  ProceedSearch() {
    this.submitted = true;
    if (this.search.invalid) {
      return;
    }
    if (this.search.valid) {
      this.service.ProceedSearch(this.search.value).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          this.responsedata.data = this.responsedata.data;
          localStorage.setItem('token', this.responsedata.data.refreshToken)
          localStorage.setItem('user', JSON.stringify(this.responsedata.data))
          this.notifyService.showSuccess(this.responsedata.message, "");
        } else {
          this.notifyService.showError("Unable to login", "");
        }
        this.route.navigate([''])
      });
    }
  }

  LoadPropertyCategories() {
    this.service.LoadPropertyCategories().subscribe(data => {
      this.categories = data;
      // this.categories = this.categories.data
      //
      this.categories = this.categories.data.filter((category: any, key: any, array: any) => {
        category.checked = '';
        if (key == 0) {
          category.checked = 'active'
        }
        return category;
      })

    });
  }

  LoadPropertyTypes() {
    this.service.LoadPropertyTypes().subscribe(data => {
      this.types = data;
      this.types = this.types.data
    });
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

  LoadBanners() {
    let tempData: Array<Object> = []
    this.service.LoadBanners(this.countryData.id).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image = element.bannerDocument.fileUrl
        tempData.push(
          { title: element.bannerHeader, desc: element.bannerTitle, img: this.baseUrl + image });
      })
    });
    // tempData.push({
    //   title: 'The World’s 1st AI-Driven Property Valuation Platform', desc: 'With a  cutting-edge tech & an innovative platform, we provide an accurate valuation of your property.', img: 'assets/videos/OvaluatePromo.mp4',type:'video'
    // })
    this.homebanners = tempData
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

  SubmitForm = new FormGroup({
    email: new FormControl("", Validators.required)
  });

  proceedStore() {
    if (this.SubmitForm.invalid) {
      this.notifyService.showError('Wrong email', "");
      return;
    }
    if (this.SubmitForm.valid) {
      this.service.StoreAddSubscriber(this.SubmitForm.value).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          this.notifyService.showSuccess(this.responsedata.message, "");
          this.SubmitForm.controls.email.setValue('');

          // if(this.responsedata.data !== undefined && this.responsedata.error.length < 1){
          //   this.notifyService.showSuccess(this.responsedata.message, "");
          // }else{
          //   this.notifyService.showError(this.responsedata.error[0], "");
          // }
        } else {
          this.notifyService.showError("Subscriber Failed", "");
        }
      });
    }

  }

  getLoadFeedback() {
    // this.clientFeedback = [
    //   {
    //     id: 'slide1',
    //     src:'assets/images/testimonial/user.png',
    //     heading:'Tanveer Ahemad',
    //     desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
    //     location: 'Bur Dubai, Dubai, UAE'
    //   },
    //   {
    //     id: 'slide2',
    //     src:'assets/images/testimonial/user.png',
    //     heading:'Tanveer Ahemad',
    //     desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
    //     location: 'Bur Dubai, Dubai, UAE'
    //   },
    //   {
    //     id: 'slide3',
    //     src:'assets/images/testimonial/user.png',
    //     heading:'Tanveer Ahemad',
    //     desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
    //     location: 'Bur Dubai, Dubai, UAE'
    //   }
    // ];

    let tempData: Array<Object> = []
    this.service.LoadFeeback().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image = '../assets/images/user.png'
        if (element.imageUrl !== null && element.imageUrl !== undefined) {
          image = this.baseUrl + element.imageUrl
        }

        tempData.push(
          { id: element.id, heading: element.fullName, desc: element.feedback, src: image, location: element.address });
      })
    });
    this.clientFeedback = tempData

  }

  selected = 'option1';

  ovaluateFeatures: any = [];
  getOvaluateFeatures() {
    let tempData: Array<Object> = []
    this.service.OvaluateFeatures().subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {
        let image = element.ovaluateFeatureDocument.fileUrl
        let className: any
        if (element.title == "Get ready to apply.  ") {
          className = "get-ready-apply"
        } else if (element.title == "Virtual home tour.") {
          className = "virtual-tour"
        } else if (element.title == "Find the best deal.") {
          className = "find-best-deal"
        }
        tempData.push(
          { id: element.id, heading: element.title, desc: element.description, src: this.baseUrl + image, class: className });
      })
    });
    this.ovaluateFeatures = tempData
  }

  wishlistStatus: any;
  AddToFavorite(id: any, status: any, part: any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }

    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
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
  openVerticallyCentered(content: any, id: any) {
    this.shareURL += "property/detail?id=" + id;
    this.whatsAppShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://wa.me/?text=" + encodeURI(this.shareURL));
    this.facebookShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(this.shareURL) + "%3Futm_source%3Dfacebook%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
    this.twitterShareUrl = this.domSanitizer.bypassSecurityTrustUrl("https://twitter.com/intent/tweet?url=" + encodeURI(this.shareURL) + "%3Futm_source%3Dtwitter%26utm_medium%3Dsocial%26utm_campaign%3Dshare_property");
    this.shareURL = this.shareURLTemp;
    this.modalService.open(content, { centered: true });
  }
}
