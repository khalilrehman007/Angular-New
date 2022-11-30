import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.scss']
})
export class TermConditionsComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
  image: any;
  title: any;
  subHeading: any;
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.TermsCondition().subscribe((result: any) => {
      this.title = result.data.pageCaptionHelightAr;
      this.subHeading = result.data.pageCaptionTextAr;
      this.image = this.baseUrl + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({ "background-image": "url('" + this.image + "')" })
      $(".cms_content-paragraph").append(result.data.pageContentAr);
      $(".inner-banner-heading p").append(this.subHeading);
    })
  }

  ngOnInit(): void {
  }

}
