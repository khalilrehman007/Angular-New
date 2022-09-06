import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-newsblog',
  templateUrl: './newsblog.component.html',
  styleUrls: ['./newsblog.component.scss']
})
export class NewsblogComponent implements OnInit {

  exploreimg = '../../../assets/images/Blog-Tile.png'
  blogs: any;
  newsBlog: any;
  constructor(private service:AppService) {
    $(window).scrollTop(0);
    this.service.BlogCategorybyId(2).subscribe((result:any)=> {
      this.newsBlog = result.data;
    })
  }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

}
