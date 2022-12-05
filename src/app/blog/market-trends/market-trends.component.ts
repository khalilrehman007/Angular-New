import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-market-trends',
  templateUrl: './market-trends.component.html',
  styleUrls: ['./market-trends.component.scss']
})
export class MarketTrendsComponent implements OnInit, AfterViewInit {
  baseUrl:string=environment.apiUrl;
  exploreimg = '../../../assets/images/Blog-Tile.png'
  Newssec = [
    {
      src: 'assets/images/blog/blog-1.png',
      src2: 'assets/images/tag/market-trends.svg',
      heading: 'The Hottest new property launches in Dubai for April 2022',
      date: 'March 01, 2022'
    },
    {
      src: 'assets/images/blog/blog-2.png',
      src2: 'assets/images/tag/tips-advice.svg',
      heading: 'The Hottest new property launches in Dubai for April 2022',
      date: 'March 01, 2022'
    },
    {
      src: 'assets/images/blog/blog-3.png',
      src2: 'assets/images/tag/explore.svg',
      heading: 'The Hottest new property launches in Dubai for April 2022',
      date: 'March 01, 2022'
    }
  ]
  eventlist = [
    {
      img: 'assets/images/slider.png',
      src2: 'assets/images/tag/market-trends.svg',
      heading: 'The Hottest new property launches in Dubai for April 2022',
      date: 'March 01, 2022',
      category: 'Tips & Advice'
    },
    {
      img: 'assets/images/slider.png',
      src2: 'assets/images/tag/tips-advice.svg',
      heading: 'The Hottest new property launches in Dubai for April 2022',
      date: 'March 01, 2022',
      category: 'Tips & Advice'
    },
    {
      img: 'assets/images/slider.png',
      src2: 'assets/images/tag/explore.svg',
      heading: 'The Hottest new property launches in Dubai for April 2022',
      date: 'March 01, 2022',
      category: 'Tips & Advice'
    }
  ]
  blogs: any;
  marketTrendsBlog: any;
  countryData:any = "";
  constructor(private service: AppService, private cookie: CookieService) {
    $(window).scrollTop(0);
    this.service.BlogCategorybyId(6).subscribe((result: any) => {
      this.marketTrendsBlog = result.data;
    })
  }
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if(this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.LoadBlogs();
        clearInterval(a);
      }
    },100);
  }

  ngOnInit(): void {
  }
  LoadBlogs() {
    this.service.LoadBlogs(this.countryData.id).subscribe(data => {
      this.blogs = data;
      this.blogs = this.blogs.data;
    });
  }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
}
