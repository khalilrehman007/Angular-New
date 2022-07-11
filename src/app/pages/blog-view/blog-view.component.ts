import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
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
    
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.service.id = params['id'];
    })
    this.LoadBlogById();
  }

  ngOnInit(): void {
  }
  LoadBlogById(){
    this.service.LoadBlogById().subscribe(data=>{
      this.blog=data;
      this.blog=this.blog.data;
      this.blog.blogDocument.fileUrl = 'https://www.ovaluate.com/'+this.blog.blogDocument.fileUrl;
      console.log(this.blog.blogDocument.fileUrl);
    });
  }
   status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
}
