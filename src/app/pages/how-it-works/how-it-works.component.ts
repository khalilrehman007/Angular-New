import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  heading:string;
  subHead:string;
  title:string;
  text:string;

  howitworks: any = [];
  faqsec: any = [];
  constructor(private api: AppService) {
    this.api.HowWorkOvaluate().subscribe((result:any) => {
      this.heading=result.data.pageCaptionHelight;
      this.subHead=result.data.pageCaptionText;
      this.howitworks = result.data.howWorkOvaluateDetails;
    })
    this.api.FAQ().subscribe((result:any)=> {
      this.title=result.data.pageCaptionHelight;
      this.text=result.data.pageCaptionText;
      $(".faq__text").append(this.text);
      this.faqsec= result.data.faqDetails;
      setTimeout(function() {
        $(".faq__accordion-text").each(function(e) {
          $(this).html($(this).text());
        })
      },100);
    })
  }

  ngOnInit(): void {
  }

}
