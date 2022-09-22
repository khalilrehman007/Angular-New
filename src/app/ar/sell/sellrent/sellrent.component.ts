import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-sellrent',
  templateUrl: './sellrent.component.html',
  styleUrls: ['./sellrent.component.scss']
})
export class SellrentComponent implements OnInit {
  bannerimg = 'assets/images/sellrentpage/sell-rent-property-img-bg.png'
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

  heading: any;
  subHead: any;
  title: any;
  text: any;

  howitworks: any = [];
  faqsec: any = [];
  constructor(private api: AppService) {
    $(window).scrollTop(0);
    this.api.HowWorkOvaluate().subscribe((result: any) => {
      this.heading = result.data.pageCaptionHelightAr;
      this.subHead = result.data.pageCaptionTextAr;
      this.howitworks = result.data.howWorkOvaluateDetails;
    })
    this.api.FAQ().subscribe((result: any) => {
      this.title = result.data.pageCaptionHelightAr;
      this.text = result.data.pageCaptionTextAr;
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
