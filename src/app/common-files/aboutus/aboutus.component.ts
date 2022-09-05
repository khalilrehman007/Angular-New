import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  image: any;
  title: any;
  subHeading: any;
  team: any = [];
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.AboutUs().subscribe((result: any) => {
      this.title = result.data.pageCaptionHelight;
      this.subHeading = result.data.pageCaptionText;
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({ "background-image": "url('" + this.image + "')" });
      $(".inner-page-banner-sec p").append(this.subHeading);
      $(".cms_content-paragraph").html(result.data.pageContent);
      $(".cms_content-paragraph-2").html(result.data.pageContentPart2);
      $(".carousel-caption").css({ "position": "relative", "left": "0", "right": "0" });
    })
    this.api.TeamMembers().subscribe((result: any) => {
      this.team = result.data;
      console.log(this.team);
    })
  }

  ngOnInit(): void {
  }

}
