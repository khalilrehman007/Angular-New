import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
  image:any;
  text:any;
  title:any;
  subHeading:any;
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.CookiePolicy().subscribe((result:any) => {
      this.title = result.data.pageCaptionHelightAr;
      this.subHeading = result.data.pageCaptionTextAr;
      this.image = this.baseUrl + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".cms_content-paragraph").append(result.data.pageContentAr);
      $(".inner-banner-heading p").append(this.subHeading);
    })
  }

  ngOnInit(): void {
  }

}
