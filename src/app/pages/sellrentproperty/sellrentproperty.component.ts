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
