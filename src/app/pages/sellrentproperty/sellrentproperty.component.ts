import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-sellrentproperty',
  templateUrl: './sellrentproperty.component.html',
  styleUrls: ['./sellrentproperty.component.scss']
})
export class SellrentpropertyComponent implements OnInit {
  bannerimg = 'assets/images/sellrentpage/sell-rent-property-img-bg.png'
  howitworks = [
    {
      id: '01',
      heading: 'Submit Property Details & Info',
      desc: 'Use our self-upload feature to provide property details and photographs'
    },
    {
      id: '02',
      heading: 'Property Review Process',
      desc: 'Our in house quality team will review your property details.'
    },
    {
      id: '03',
      heading: 'Your Property Goes Live',
      desc: 'Sit back and relax as leads begin to pour in'
    }
  ]
  premiumproperrty = [
    {
      id: '028',
      heading: 'Landlords/Owners',
      buttontext: 'Explore Packages',
      link: 'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Landlords already listing'
    },
    {
      id: '028',
      heading: 'Agency/ Brokrage Firms',
      buttontext: 'Explore Packages',
      link: 'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Agency already listing'
    },
    {
      id: '028',
      heading: 'Agents/Brokers',
      buttontext: 'Explore Packages',
      link: 'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Landlords already listing'
    },
    {
      id: '028',
      heading: 'Property Managers',
      buttontext: 'Explore Packages',
      link: 'listing-packages',
      src: 'assets/images/sellrentpage/premium-property-listing-packages.svg',
      desc: 'Landlords already listing'
    }
  ]
  
  title:string;
  text:string;
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
