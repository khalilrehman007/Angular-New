import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/service/app.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-classified-home',
  templateUrl: './classified-home.component.html',
  styleUrls: ['./classified-home.component.scss']
})
export class ClassifiedHomeComponent implements OnInit, AfterViewInit {
  isDisabled: boolean = false;
  pricetag = '../../../assets/images/icons/price-tag.svg'
  applestore = '../../../assets/images/apple-store.png'
  playstore = '../../../assets/images/play-store.png'
  phonemockup = '../../../assets/images/mockup-mobile-classified.png'
  bedsvg = '../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../assets/images/icons/Bath-tub.svg'
  squaremetersvg = '../../../assets/images/icons/Square Meters.svg'
  homelocationsvg = '../../../assets/images/home-location.svg'
  dubaigv = '../../../assets/images/goverment-of-dubai.png'
  landdept = '../../../assets/images/Dubai-Land-LOGO.png'
  rera = '../../../assets/images/rera.png'
  propertyrent = '../../../assets/images/icons/property-for-rent.svg'
  propertysale = '../../../assets/images/icons/property-for-sale.svg'
  motors = '../../../assets/images/icons/motors.svg'
  services = '../../../assets/images/icons/service.svg'
  mobilephone = '../../../assets/images/icons/mobile-tablet.svg'
  homeappliances = '../../../assets/images/icons/home-appliance.svg'
  furnituregarden = '../../../assets/images/icons/furniture-garden.svg'
  community = '../../../assets/images/icons/community.svg'

  serviceTs = [
    {
      src: '../../../assets/images/services/handyman.jpg',
      title: 'Handyman',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/movers.jpeg',
      title: 'Moving Services',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/furniture-assembly.jpeg',
      title: 'Furniture Assembly',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/mobile-service.jpeg',
      title: 'Mobile Sales & Service',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/cleaning.jpeg',
      title: 'Cleaning',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/auto-service-parts.jpeg',
      title: 'Auto Accessories & Parts',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/Yardwork-Services.jpeg',
      title: 'Yardwork Services',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    },
    {
      src: '../../../assets/images/services/freelancers.jpeg',
      title: 'Freelancers',
      text: 'Avg Price AED100 - AED120',
      link: 'classified/service-details',
    }
  ]
  CarsList = [
    {
      src: '../../../assets/images/cars/car1.jpeg',
      price: '58,657 AED',
      PropertyName: 'Bentley Flying Spur',
      link: 'classified/car-details',
      address: 'Etihad Tower 4, Etihad Towers,  ',
    },
    {
      src: '../../../assets/images/cars/car2.jpeg',
      price: '69,098 AED',
      PropertyName: 'Mercedes-Benz AMG G 63',
      link: 'classified/car-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/cars/car3.jpeg',
      price: '42,000 AED',
      PropertyName: 'Ferrari SF90',
      link: 'classified/car-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/cars/car1.jpeg',
      price: '58,657 AED',
      PropertyName: 'Bentley Flying Spur',
      link: 'classified/car-details',
      address: 'Etihad Tower 4, Etihad Towers,  ',
    },
    {
      src: '../../../assets/images/cars/car2.jpeg',
      price: '69,098 AED',
      PropertyName: 'Mercedes-Benz AMG G 63',
      link: 'classified/car-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/cars/car3.jpeg',
      price: '42,000 AED',
      PropertyName: 'Ferrari SF90',
      link: 'classified/car-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  FurnitureList = [
    {
      src: '../../../assets/images/furniture/furniture1.jpeg',
      price: '450 AED',
      PropertyName: 'Blue Wave Tower',
      link: 'classified/furniture-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture2.jpeg',
      price: '1,280 AED',
      PropertyName: 'Blue Wave Tower',
      link: 'classified/furniture-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture3.jpeg',
      price: '282 AED',
      PropertyName: 'Blue Wave Tower',
      link: 'classified/furniture-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture4.jpeg',
      price: '350,000 AED',
      PropertyName: 'Blue Wave Tower',
      link: 'classified/furniture-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture1.jpeg',
      price: '450 AED',
      PropertyName: 'Blue Wave Tower',
      link: 'classified/furniture-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture2.jpeg',
      price: '1,280 AED',
      PropertyName: 'Blue Wave Tower',
      link: 'classified/furniture-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  sportsList = [
    {
      src: '../../../assets/images/sports/sports1.jpeg',
      price: '298 AED',
      PropertyName: 'Indoor Bike',
      link: 'classified/sports-equipment-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports2.jpeg',
      price: '142 AED',
      PropertyName: 'Dumbbell',
      link: 'classified/sports-equipment-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports1.jpeg',
      price: '298 AED',
      PropertyName: 'Indoor Bike',
      link: 'classified/sports-equipment-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports2.jpeg',
      price: '142 AED',
      PropertyName: 'Dumbbell',
      link: 'classified/sports-equipment-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports1.jpeg',
      price: '298 AED',
      PropertyName: 'Indoor Bike',
      link: 'classified/sports-equipment-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports2.jpeg',
      price: '142 AED',
      PropertyName: 'Dumbbell',
      link: 'classified/sports-equipment-details',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  MobileTabletList = [
    {
      src: '../../../assets/images/mobile-tablet/mt1.jpeg',
      price: '570 AED',
      PropertyName: 'Tablet',
      link: 'classified/phone-tablet-details',
      address: 'Al Mamzar',
    },
    {
      src: '../../../assets/images/mobile-tablet/mt2.jpeg',
      price: '350,000 AED',
      PropertyName: 'Samsung S20 FE',
      link: 'classified/phone-tablet-details',
      address: 'Barsha Heights',
    },
    {
      src: '../../../assets/images/mobile-tablet/mt3.jpeg',
      price: '285 AED',
      PropertyName: 'Iphone',
      link: 'classified/phone-tablet-details',
      address: 'Dubai International Airport ',
    },
    {
      src: '../../../assets/images/mobile-tablet/mt4.jpeg',
      price: '355 AED',
      PropertyName: 'Samsung S20 FE',
      link: 'classified/phone-tablet-details',
      address: 'Barsha Heights ',
    },
  ]
  customOptions: OwlOptions = {
    loop: false,
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
        items: 4
      }
    },
    nav: false
  }
  countryData:any = "";
  popularServices:any = [];
  baseUrl = environment.apiUrl;
  constructor(private modalService: NgbModal, private service : AppService, private cookie: CookieService) {
    $(window).scrollTop(0);
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.service.PopularServices({"CountryId":this.countryData.id,"CategoryId":"1"}).subscribe((result:any) => {
          this.popularServices = result.data.slice(0, 8);
          console.log(this.popularServices);
        })
        clearInterval(a);
      }
    })
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem("user");
    user=JSON.parse(user);
    if(user==null || user == undefined){
      user=localStorage.getItem("user");
      user=JSON.parse(user)
      this.isDisabled = user?.professionalTypeId ? true : false;
    }else{
      this.isDisabled = user?.ProfessionalTypeId ? true : false;
    }
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}