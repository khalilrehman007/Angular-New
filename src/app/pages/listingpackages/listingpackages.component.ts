import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-listingpackages',
  templateUrl: './listingpackages.component.html',
  styleUrls: ['./listingpackages.component.scss']
})
export class ListingpackagesComponent implements OnInit {
  rightarrow = '../../../assets/images/icons/right-arrow.svg'
  renttab = '../../../assets/images/icons/rent-tab.svg'
  selltab = '../../../assets/images/icons/sell-property-tab.svg'
  renttabactve = '../../../assets/images/icons/rent-active.svg'
  selltabactive = '../../../assets/images/icons/sell-tab-active.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
