import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-newsblog',
  templateUrl: './newsblog.component.html',
  styleUrls: ['./newsblog.component.scss']
})
export class NewsblogComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
  showLoader:boolean=false;
  exploreimg = '../../../assets/images/Blog-Tile.png'
  blogs: any;
  newsBlog: any;
  constructor(private service:AppService) {
    $(window).scrollTop(0);
    this.showLoader=true;
    this.service.BlogCategorybyId(2).subscribe({
      next:(result:any)=> {
        this.newsBlog = result.data;
        this.showLoader=false;
      },
      error:(err)=>{
        this.showLoader=false;
      }
    })
  }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

}
