import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
