import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {SliderModule} from 'primeng/slider';
import * as $ from 'jquery';
import {NgbNav} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CustomerService } from 'src/app/service/customer.service';
import { AppService } from 'src/app/service/app.service';
// import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homelocationsvg = 'assets/images/home-location.svg'
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/home-location.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  brandimg = 'assets/images/better-home.svg'
  listingsliderimg = 'assets/images/property-listing-slider-img.png'
  blogs: any;
  dynamicSlides = [
    {
      id: 'slide1',
      src:'assets/images/property/1.png',
      alt:'Side 1',
      title:'Side 1'
    },
    {
      id: 'slide2',
      src:'assets/images/property/1.png',
      alt:'Side 2',
      title:'Side 2'
    },
    {
      id: 'slide3',
      src:'assets/images/property/1.png',
      alt:'Side 3',
      title:'Side 3'
    },
    {
      id: 'slide4',
      src:'assets/images/property/1.png',
      alt:'Side 4',
      title:'Side 4'
    },
    {
      id: 'slide5',
      src:'assets/images/property/1.png',
      alt:'Side 5',
      title:'Side 5'
    }
  ]
  tenantsslide = [
    {
      id: 'slide1',
      src:'assets/images/icons/virtul-toor.svg',
      heading:'Virtual home tour',
      desc:'You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.',
      class:'virtual-tour'
    },
    {
      id: 'slide2',
      src:'assets/images/icons/best-deal.svg',
      heading:'Find the best deal',
      desc:'Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!',
      class:'find-best-deal'
    },
    {
      id: 'slide3',
      src:'assets/images/icons/ready-apply.svg',
      heading:'Get ready to apply',
      desc:'Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!',
      class:'get-ready-apply'
    }
  ]
  clientslide = [
    {
      id: 'slide1',
      src:'assets/images/testimonial/user.png',
      heading:'Tanveer Ahemad',
      desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
      location: 'Bur Dubai, Dubai, UAE'
    },
    {
      id: 'slide2',
      src:'assets/images/testimonial/user.png',
      heading:'Tanveer Ahemad',
      desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
      location: 'Bur Dubai, Dubai, UAE'
    },
    {
      id: 'slide3',
      src:'assets/images/testimonial/user.png',
      heading:'Tanveer Ahemad',
      desc:'Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient.',
      location: 'Bur Dubai, Dubai, UAE'
    }
  ]
  Exploreplaces = [
    {
      src:'assets/images/explore-places/1.jpg',
      heading:'Al Barsha, Dubai',
      paragraph:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro...'
    },
    {
      src:'assets/images/explore-places/2.jpg',
      heading:'Business Bay, Dubai',
      paragraph:'Al Barsha is a safe and quiet area that offers something for everyone: be it singles looking for wallet-friendly apartments with Metro...'
    }
  ]
  Blogsec = [
    {
      src:'assets/images/blog/blog-1.png',
      src2: 'assets/images/tag/market-trends.png',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022'
    },
    {
      src:'assets/images/blog/blog-2.png',
      src2: 'assets/images/tag/tips-advice.png',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022'
    },
    {
      src:'assets/images/blog/blog-3.png',
      src2: 'assets/images/tag/explore.png',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022'
    }
  ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
    nav: false
  }
  easyslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
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
        items: 2
      }
    },
    nav: false
  }
  sellrentproperty: OwlOptions = {
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
  
  constructor(private service:AppService) { 
    this.LoadBlogs();
  }
  ngOnInit():void {
    
    $(document).ready(function(){
      $('.dropdown-toggle').click(function(){
      $(this).next().toggleClass('active');
      });
  });
  }
  LoadBlogs(){
    this.service.LoadBlogs().subscribe(data=>{
      this.blogs=data;
      this.blogs=this.blogs.data;
      // array.forEach(element => {
        
      // });
    console.log(this.blogs);

    });
  }
 
  selected = 'option1';
}
