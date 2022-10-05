import { Component, OnInit } from '@angular/core';
import {AppService} from "../../service/app.service";
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-packages',
  templateUrl: './payment-packages.component.html',
  styleUrls: ['./payment-packages.component.scss']
})
export class PaymentPackagesComponent implements OnInit {
  rightarrow = '../../../assets/images/icons/right-arrow.svg'
  renttab = '../../../assets/images/icons/rent-tab.svg'
  selltab = '../../../assets/images/icons/sell-property-tab.svg'
  renttabactve = '../../../assets/images/icons/rent-active.svg'
  selltabactive = '../../../assets/images/icons/sell-tab-active.svg'
  professionalTypes: any = [];
  propertyListingTypes: any = [];
  professionalAndListingType: any = [];
  professionalArray: any = [];
  professionalTypeId:any = '';
  professionalPakageView: any;
  professionalTypeTab: any;


  constructor(private service: AppService,private modalService: NgbModal) {
    $(window).scrollTop(0);
    this.loadProfessionalTypes();
    this.loadPropertyListingTypes();
    this.professionalTypeTab = localStorage.getItem('user');
    this.professionalTypeTab = JSON.parse(this.professionalTypeTab);
  }

  ngOnInit(): void {
  }

  loadProfessionalTypes() {
    this.service.LoadProfessionalTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Professional type List fetched successfully") {
        for (let professionalTypes of temp.data) {
          this.professionalTypes.push({ name: professionalTypes.name, id: professionalTypes.id,nameAr:professionalTypes.nameAr });
        }
      }
    });
  }
  loadPropertyListingTypes() {

    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        for (let PropertyListingTypes of temp.data) {
          this.propertyListingTypes.push({ name: PropertyListingTypes.name, id: PropertyListingTypes.id,nameAr:PropertyListingTypes.nameAr });
        }
      }
    });
  }

  public loadProfessionalAndListingType(e:any){
    let listingTypeId:any;
    if(e.tab.textLabel == 'Agent' || e.tab.textLabel == 'Landlord' || e.tab.textLabel == 'developer' ){
      let tempPprofessionalId = '';
      this.professionalTypes.forEach((key : any, val: any) => {
        if(key.name == e.tab.textLabel){
          tempPprofessionalId = key.id
        }
      })
      this.professionalTypeId = tempPprofessionalId;
      listingTypeId = 1;
    } else {
      let professionalId:any = document.getElementById("professionalTypeId");
      this.professionalTypeId = professionalId.value;
    }
    this.professionalAndListingType = []
    if(e.index == 1 && listingTypeId == null){
      listingTypeId = 2;
    }else {
      listingTypeId = 1;
    }
    console.log(this.professionalTypeId,listingTypeId)
    this.service.LoadProfessionalAndListingType(this.professionalTypeId,listingTypeId).subscribe(e => {
      let temp: any = e;
      if (temp.message == "The Packages fetched successfully") {
        for (let ProfessionalAndListingType of temp.data) {
          this.professionalAndListingType.push({
            name: ProfessionalAndListingType.name,
            nameAr: ProfessionalAndListingType.nameAr,
            price:ProfessionalAndListingType.price,
            discountPercentage:ProfessionalAndListingType.discountPercentage,
            propertyListingTypeId:ProfessionalAndListingType.propertyListingTypeId,
            professionalTypeId:ProfessionalAndListingType.professionalTypeId,
            propertyListingPackageFeatures:ProfessionalAndListingType.propertyListingPackageFeatures,
            propertyListingPackageSubFeatures:ProfessionalAndListingType.propertyListingPackageFeatures.propertyListingPackageSubFeatures,
            propertyListingType:ProfessionalAndListingType.propertyListingType,
            professionalType:ProfessionalAndListingType.professionalType,
          });
        }
      }
    });

  }
  platinumPopup(Platinumcontent: any) {
    this.modalService.open(Platinumcontent, { centered: true });
  }
  premiumPopup(premiumcontent: any) {
    this.modalService.open(premiumcontent, { centered: true });
  }
  freePopup(freecontent: any) {
    this.modalService.open(freecontent, { centered: true });
  }
}
