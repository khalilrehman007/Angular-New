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
    this.api.PrivacyPolicy().subscribe((result:any)=> {
      this.text = result.data.pageCaptionText.substr(0,1).toUpperCase()+result.data.pageCaptionText.substr(1);
      this.title = this.text.split("</br>")[0];
      this.subHeading = this.text.split("</br>")[1];
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".cms_content-paragraph").append(result.data.pageContent);
    })
  }

  ngOnInit(): void {
  }

}
