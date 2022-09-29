import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  image:any;
  text:any;
  title:any;
  subHeading:any;
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.PrivacyPolicy().subscribe((result:any)=> {
      this.title = result.data.pageCaptionHelightAr;
      this.subHeading = result.data.pageCaptionTextAr;
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".cms_content-paragraph").append(result.data.pageContentAr);
      $(".inner-banner-heading p").append(this.subHeading);
    })
  }

  ngOnInit(): void {
  }

}
