import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-view',
  templateUrl: './blogview.component.html',
  styleUrls: ['./blogview.component.scss']
})
export class ViewComponent implements OnInit {

  blog: any;
  id: any;
  constructor(private router: Router,private service:AppService) { 
    this.LoadBlogById();
    // extras.state.id
    this.id = this.router.url;
    console.log(this.router.url);
  }

  ngOnInit(): void {
  }
  LoadBlogById(){
    this.service.LoadBlogById().subscribe(data=>{
      this.blog=data;
      this.blog=this.blog.data;
      console.log(this.blog);

    });
  }
}
