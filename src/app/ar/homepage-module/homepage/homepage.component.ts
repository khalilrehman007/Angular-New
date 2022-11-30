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
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

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
  user: any;
  countryData: any = "";
  id: any = 1;
  propertyDetails: any;
  oldData1() {
    this.service.LatestPropertiesListingResidential({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "1" }).subscribe((response: any) => {
      this.dynamicSlides1 = response.data;
    });
  }
  newData1() {
    this.service.LatestPropertiesListingResidential({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "2" }).subscribe((response: any) => {
      this.dynamicSlides1 = response.data;
    });
  }

  oldData2() {
    this.service.LatestPropertiesListingCommercial({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "1" }).subscribe((response: any) => {
      this.dynamicSlides2 = response.data;
    });
  }
  newData2() {
    this.service.LatestPropertiesListingCommercial({ "CountryId": this.countryData.id, "UserId": this.userId, "propertyListingTypeId": "2" }).subscribe((response: any) => {
      this.dynamicSlides2 = response.data;
    });
  }
  tenantsslide = [
    {
      id: 'slide1',
      src: 'assets/images/icons/virtul-toor.svg',
      heading: 'جولة منزلية افتراضية',
      desc: 'يمكنك التواصل مباشرة مع ملاك العقارات ونوفر لك جولة افتراضية قبل أن تشتري أو تستأجر العقار.',
      class: 'virtual-tour'
    },
    {
      id: 'slide2',
      src: 'assets/images/icons/best-deal.svg',
      heading: 'اعثر على أفضل صفقة',
      desc: 'تصفح آلاف العقارات واحفظ مفضلاتك وقم بإعداد تنبيهات البحث حتى لا تفوتك أفضل صفقة شراء للمنزل!',
      class: 'find-best-deal'
    },
    {
      id: 'slide3',
      src: 'assets/images/icons/ready-apply.svg',
      heading: 'احصل على استعداد للتقديم',
      desc: 'ابحث عن منزل أحلامك؟ ما عليك سوى بذل القليل من الجهد أو بدون جهد ويمكنك البدء في الانتقال إلى منزل أحلامك الجديد!',
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
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
    nav: true
  }
  easyslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl: true,
    center: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
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
    rtl: true,
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
    rtl: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
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
  explorePlaces: any;
  trendTitle: any = [];
  constructor(private cookie: CookieService, private authService: AuthService, private service: AppService, private route: Router, private notifyService: NotificationService,private modalService: NgbModal) {
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

    // this.service.ValuationTransactions().subscribe(data=>{
    //   this.valuationTransactions = data;
    //   this.valuationTransactions = this.valuationTransactions.data;
    //   this.totalTransactions = this.valuationTransactions[0].value;
    //   this.totalSales = this.valuationTransactions[1].value;
    //   this.totalMortgages = this.valuationTransactions[2].value;
    //
    // });

    this.service.OvaluateOfferings().subscribe((result: any = []) => {
      this.slider = result.data;
    })
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.service.NearPlaces(this.countryData.id).subscribe((result: any) => {
          this.explorePlaces = result.data;
        });
        this.service.TrendTitle(this.countryData.id).subscribe((result: any) => {
          this.trendTitle = result.data
        });
        this.oldData2();
        this.oldData1();
        this.LoadBanners();
        this.LoadBlogs();
        this.ValuationTransactions();
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
    this.route.navigate(['/ar/property/search'], params)
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
          { keyAr: element.keyAr, valueAr: element.valueAr });
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
          { title: element.bannerHeaderAr, desc: element.bannerTitleAr, img: this.baseUrl + image });
      })
    });
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
      this.route.navigate(['/ar/login'])
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
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
