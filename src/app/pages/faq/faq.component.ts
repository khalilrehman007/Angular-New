import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqsec = [
    {
      heading:'Can I post my property as an owner for free?',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
    },
    {
      heading:'Will I receive leads even with free listing?',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
    },
    {
      heading:'Why should I buy a paid owner package?',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
    },
    {
      heading:'How to upgrade my free listing to a paid listing?',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
    },
    {
      heading:'Can I link multiple properties with a single paid package?',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
    }
  ]
  constructor(private api: AppService) {
    // this.api.FAQ().subscribe((result:any)=> {
    //   $(".faq-section-wrapper").append(result.data.pageContent);
    // })
  }

  ngOnInit(): void {
  }

}
