import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  title: string = "";
  text: string = "";
  faqsec: any = [];
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.FAQ().subscribe((result: any) => {
      this.title = result.data.pageCaptionHelight;
      this.text = result.data.pageCaptionText;
      $(".faq__text").append(this.text);
      this.faqsec = result.data.faqDetails;
      setTimeout(function () {
        $(".faq__accordion-text").each(function (e) {
          $(this).html($(this).text());
        })
      }, 100);
    })
  }

  ngOnInit(): void {
  }

}
