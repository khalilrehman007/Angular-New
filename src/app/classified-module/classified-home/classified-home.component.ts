import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-classified-home',
  templateUrl: './classified-home.component.html',
  styleUrls: ['./classified-home.component.scss']
})
export class ClassifiedHomeComponent implements OnInit {
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
      link: '',
    },
    {
      src: '../../../assets/images/services/movers.jpeg',
      title: 'Moving Services',
      text: 'Avg Price AED100 - AED120',
      link: '',
    },
      {
      src: '../../../assets/images/services/furniture-assembly.jpeg',
      title: 'Furniture Assembly',
      text: 'Avg Price AED100 - AED120',
      link: '',
    },
    {
      src: '../../../assets/images/services/mobile-service.jpeg',
      title: 'Mobile Sales & Service',
      text: 'Avg Price AED100 - AED120',
      link: '',
    },
    {
      src: '../../../assets/images/services/cleaning.jpeg',
      title: 'Cleaning',
      text: 'Avg Price AED100 - AED120',
      link: '',
    },
    {
      src: '../../../assets/images/services/auto-service-parts.jpeg',
      title: 'Auto Accessories & Parts',
      text: 'Avg Price AED100 - AED120',
      link: '',
    },
    {
      src: '../../../assets/images/services/Yardwork-Services.jpeg',
      title: 'Yardwork Services',
      text: 'Avg Price AED100 - AED120',
      link: '',
    },
    {
      src: '../../../assets/images/services/freelancers.jpeg',
      title: 'Freelancers',
      text: 'Avg Price AED100 - AED120',
      link: '',
    }
  ]
  CarsList = [
    {
      src: '../../../assets/images/cars/car1.jpeg',
      price: '58,657 AED',
      PropertyName: 'Bentley Flying Spur',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,  ',
    },
    {
      src: '../../../assets/images/cars/car2.jpeg',
      price: '69,098 AED',
      PropertyName: 'Mercedes-Benz AMG G 63',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/cars/car3.jpeg',
      price: '42,000 AED',
      PropertyName: 'Ferrari SF90',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/cars/car1.jpeg',
      price: '58,657 AED',
      PropertyName: 'Bentley Flying Spur',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,  ',
    },
    {
      src: '../../../assets/images/cars/car2.jpeg',
      price: '69,098 AED',
      PropertyName: 'Mercedes-Benz AMG G 63',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/cars/car3.jpeg',
      price: '42,000 AED',
      PropertyName: 'Ferrari SF90',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  FurnitureList = [
    {
      src: '../../../assets/images/furniture/furniture1.jpeg',
      price: '450 AED',
      PropertyName: 'Blue Wave Tower',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture2.jpeg',
      price: '1,280 AED',
      PropertyName: 'Blue Wave Tower',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture3.jpeg',
      price: '282 AED',
      PropertyName: 'Blue Wave Tower',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture4.jpeg',
      price: '350,000 AED',
      PropertyName: 'Blue Wave Tower',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture1.jpeg',
      price: '450 AED',
      PropertyName: 'Blue Wave Tower',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/furniture/furniture2.jpeg',
      price: '1,280 AED',
      PropertyName: 'Blue Wave Tower',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  sportsList = [
    {
      src: '../../../assets/images/sports/sports1.jpeg',
      price: '298 AED',
      PropertyName: 'Indoor Bike',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports2.jpeg',
      price: '142 AED',
      PropertyName: 'Dumbbell',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports1.jpeg',
      price: '298 AED',
      PropertyName: 'Indoor Bike',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports2.jpeg',
      price: '142 AED',
      PropertyName: 'Dumbbell',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports1.jpeg',
      price: '298 AED',
      PropertyName: 'Indoor Bike',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src: '../../../assets/images/sports/sports2.jpeg',
      price: '142 AED',
      PropertyName: 'Dumbbell',
      link: '',
      address: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  MobileTabletList = [
    {
      src: '../../../assets/images/mobile-tablet/mt1.jpeg',
      price: '570 AED',
      PropertyName: 'Tablet',
      link: '',
      address: 'Al Mamzar',
    },
    {
      src: '../../../assets/images/mobile-tablet/mt2.jpeg',
      price: '350,000 AED',
      PropertyName: 'Samsung S20 FE',
      link: '',
      address: 'Barsha Heights',
    },
    {
      src: '../../../assets/images/mobile-tablet/mt3.jpeg',
      price: '285 AED',
      PropertyName: 'Iphone',
      link: '',
      address: 'Dubai International Airport ',
    },
    {
      src: '../../../assets/images/mobile-tablet/mt4.jpeg',
      price: '355 AED',
      PropertyName: 'Samsung S20 FE',
      link: '',
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
  constructor() {
    $(window).scrollTop(0);
  }

  ngOnInit(): void {
  }

}
