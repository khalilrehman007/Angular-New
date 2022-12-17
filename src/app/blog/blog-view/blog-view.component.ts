import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
  exploreimg = '../../../assets/images/Blog-Tile.png'
  blog: any;
  id: any;
  blogsec = [
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
  constructor(private route: ActivatedRoute,private router: Router,private service:AppService) {
    $(window).scrollTop(0);
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        $(window).scrollTop(0);
        this.route.params.subscribe(params=>{
          this.id = params['id'];
          this.service.id = params['id'];
        })
        this.service.BlogBySlug(this.id).subscribe(data=>{
          this.blog=data;
          this.blog=this.blog.data;
          this.blog.blogDocument.fileUrl = this.baseUrl+this.blog.blogDocument.fileUrl;
          $(".blog-post-content").html(this.blog.contentData);
        });
      }
    }); 
    
  }

  ngOnInit(): void {
  }
  LoadBlogById(){
  }
   status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

}
