import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  title:string;
  text:string;

  howitworks = [
    {
      id: '01',
      heading:'Submit Property Details & Info',
      desc:'Use our self-upload feature to provide property details and photographs'
    },
    {
      id: '02',
      heading:'Property Review Process',
      desc:'Our in house quality team will review your property details.'
    },
    {
      id: '03',
      heading:'Your Property Goes Live',
      desc:'Sit back and relax as leads begin to pour in'
    }
  ]
  faqsec: any = [];
  constructor(private api: AppService) {
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
