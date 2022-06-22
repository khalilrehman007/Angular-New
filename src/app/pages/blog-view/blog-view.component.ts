import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  blog: any;
  id: any;
  constructor(private route: ActivatedRoute,private router: Router,private service:AppService) { 
    
    this.route.params.subscribe(params=>{
      this.id = params['id'];
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
}
