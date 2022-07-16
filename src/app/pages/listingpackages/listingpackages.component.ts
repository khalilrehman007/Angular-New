import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import {AppService} from "../../service/app.service";
import * as $ from 'jquery';

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
  professionalTypes: any = [];
  propertyListingTypes: any = [];
  professionalAndListingType: any = [];
  professionalArray: any = [];
  professionalTypeId:any = '';


  constructor(private service: AppService) {
    this.loadProfessionalTypes();
    this.loadPropertyListingTypes();
    // this.loadProfessionalAndListingType(2,1);
    console.log(this.professionalAndListingType)
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
    if(e.tab.textLabel == 'Agent' || e.tab.textLabel == 'Landlord' || e.tab.textLabel == 'developer' ){
      let tempPprofessionalId = '';
      this.professionalTypes.forEach((key : any, val: any) => {
        if(key.name == e.tab.textLabel){
          tempPprofessionalId = key.id
        }
      })
      this.professionalTypeId = tempPprofessionalId;
      console.log('in')
    } else {
      let professionalId:any = document.getElementById("professionalTypeId");
      this.professionalTypeId = professionalId.value;
      console.log('out')
    }
    this.professionalAndListingType = []
    if(e.index == 1){

      this.service.LoadProfessionalAndListingType(this.professionalTypeId,2).subscribe(e => {
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
    }else {
      console.log(this.professionalTypeId,1)
      this.service.LoadProfessionalAndListingType(this.professionalTypeId,1).subscribe(e => {
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
    // this.professionalArray = this.professionalAndListingType.slice(0, 2)

    // console.log(this.professionalAndListingType)
  }



}
