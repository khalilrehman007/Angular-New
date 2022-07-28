import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {

  image:any;
  text:any;
  title:any;
  subHeading:any;
  constructor(private api: AppService) {
    this.api.CookiePolicy().subscribe((result:any) => {
      this.title = result.data.pageCaptionHelight;
      this.subHeading = result.data.pageCaptionText;
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".cms_content-paragraph").append(result.data.pageContent);
      $(".inner-banner-heading p").append(this.subHeading);
    })
  }

  ngOnInit(): void {
  }

}
