import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-tips-advice',
  templateUrl: './tips-advice.component.html',
  styleUrls: ['./tips-advice.component.scss']
})
export class TipsAdviceComponent implements OnInit {
  exploreimg = '../../../assets/images/Blog-Tile.png'
  Newssec = [
    {
      src:'assets/images/blog/blog-1.png',
      src2: 'assets/images/tag/market-trends.svg',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022'
    },
    {
      src:'assets/images/blog/blog-2.png',
      src2: 'assets/images/tag/tips-advice.svg',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022'
    },
    {
      src:'assets/images/blog/blog-3.png',
      src2: 'assets/images/tag/explore.svg',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022'
    }
  ]
  eventlist = [
    {
      img: 'assets/images/slider.png',
      src2: 'assets/images/tag/market-trends.svg',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022',
      category: 'Tips & Advice'
    },
    {
      img: 'assets/images/slider.png',
      src2: 'assets/images/tag/tips-advice.svg',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022',
      category: 'Tips & Advice'
    },
    {
      img: 'assets/images/slider.png',
      src2: 'assets/images/tag/explore.svg',
      heading:'The Hottest new property launches in Dubai for April 2022',
      date:'March 01, 2022',
      category: 'Tips & Advice'
    }
  ]
  blogs: any;
  tipsAndAdvice: any;
  constructor(private service:AppService) {
    $(window).scrollTop(0);
    this.service.BlogCategorybyId(1).subscribe((result:any)=> {
      this.tipsAndAdvice = result.data;
    })
  }

  ngOnInit(): void {
  }
  LoadBlogs(){
    this.service.LoadBlogs().subscribe(data=>{
      this.blogs=data;
      this.blogs=this.blogs.data;

    });
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

}
