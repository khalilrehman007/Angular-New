import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  exploreimg = '../../../assets/images/Blog-Tile.png'
  allBlogs = [
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
  latestNews:any = [];
  featureBlogs: any;
  categoryBlogs: any;
  mainBlog: any = {};
  constructor(private service:AppService) {
    $(window).scrollTop(0); 
    this.LoadBlogs();
    this.service.BlogLatestNews().subscribe((result:any)=> {
      this.latestNews.push(result.data[0]);
      this.latestNews.push(result.data[1]);
      this.latestNews.push(result.data[2]);
    })
    this.service.BlogFeatures().subscribe((result:any)=> {
      this.featureBlogs = result.data;
    })
    this.service.BlogCategories().subscribe((result:any)=> {
      this.categoryBlogs = result.data;
    })
    this.service.LoadBlogById(1).subscribe((result:any)=>{
      this.mainBlog = result.data;
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
