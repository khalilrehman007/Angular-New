import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-sellrentproperty',
  templateUrl: './sellrentproperty.component.html',
  styleUrls: ['./sellrentproperty.component.scss']
})
export class SellrentpropertyComponent implements OnInit {
  bannerimg ='assets/images/sellrentpage/sell-rent-property-img-bg.png'
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
  premiumproperrty = [
    {
      id: '028',
      heading:'Landlords/Owners',
      buttontext:'Explore Packages',
      link:'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Landlords already listing'
    },
    {
      id: '028',
      heading:'Agency/ Brokrage Firms',
      buttontext:'Explore Packages',
      link:'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Agency already listing'
    },
    {
      id: '028',
      heading:'Agents/Brokers',
      buttontext:'Explore Packages',
      link:'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Landlords already listing'
    },
    {
      id: '028',
      heading:'Property Managers',
      buttontext:'Explore Packages',
      link:'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Landlords already listing'
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
