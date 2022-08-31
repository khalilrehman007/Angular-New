import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.scss']
})
export class TermConditionsComponent implements OnInit {

  image: any;
  title: any;
  subHeading: any;
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.TermsCondition().subscribe((result: any) => {
      this.title = result.data.pageCaptionHelight;
      this.subHeading = result.data.pageCaptionText;
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({ "background-image": "url('" + this.image + "')" })
      $(".cms_content-paragraph").append(result.data.pageContent);
      $(".inner-banner-heading p").append(this.subHeading);
    })
  }

  ngOnInit(): void {
  }

}
