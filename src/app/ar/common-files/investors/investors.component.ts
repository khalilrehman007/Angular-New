import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss']
})
export class InvestorsComponent implements OnInit {
  team: any=[];
  image:any;
  title:any;
  subHeading:any;

  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.TeamMembers().subscribe((result: any) => {
      this.team = result.data;
    })
    this.api.TeamMemberBanner().subscribe((result:any)=> {
      this.title = result.data.pageCaptionHelightAr;
      this.subHeading = result.data.pageCaptionTextAr;
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".inner-banner-heading p").append(this.subHeading);
    })
   }

  ngOnInit(): void {
  }

}
