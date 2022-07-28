import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  image:any;
  text:any;
  title:any;
  subHeading:any;
  constructor(private api: AppService) {
    this.api.AboutUs().subscribe((result:any)=> {
      // $(".cms_content-paragraph").append(result.data.pageContent);
      this.text = result.data.pageCaptionText.substr(0,1).toUpperCase()+result.data.pageCaptionText.substr(1);
      this.title = this.text.split("</br>")[0];
      this.subHeading = this.text.split("</br>")[1];
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".cms_content-paragraph").append(result.data.pageContent);
      $(".carousel-caption").css({"position":"relative","left":"0","right":"0"})
    })
  }

  ngOnInit(): void {
  }

}
