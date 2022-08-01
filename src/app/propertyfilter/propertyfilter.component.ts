import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../service/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-propertyfilter',
  templateUrl: './propertyfilter.component.html',
  styleUrls: ['./propertyfilter.component.scss']
})
export class PropertyfilterComponent implements OnInit {
  type :any;
  PropertyCategoryId :any;
  RentTypeId :any;
  PropertyTypeListingId :any;
  PropertyAddress :any;
  PriceStart :any;
  PriceEnd :any;
  minValue: number = 0;
  maxValue: number = 0;

  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router) {
    this.type                 = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId   = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId           = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyTypeListingId = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeListingId');
    this.PropertyAddress       = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart            = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd              = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');

    this.SubmitForm.controls.Name.setValue(this.PropertyAddress);
    this.loadType();
    this.LoadPropertyCategories();
  }

  public options2 = [
    {"id": 1, "name": "Rent"},
    {"id": 2, "name": "Buy"}
  ]

  rentTypes:any = []
  selectedRentType :any;
  loadType(){
    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        let temp: any = e;
          for (let list of temp.data) {
            if(this.selectedRentType == null){
              if(list.name.trim() == this.type.trim()){
                this.selectedRentType = list.id;
              }
            }
            this.rentTypes.push({ name: list.name, id: list.id });
          }
      }
    });
  }

  SubmitForm = new FormGroup({
    Name : new FormControl(""),
  });
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return value +  'AED';
    }
  };
  minValue1: number = 10;
  maxValue1: number = 50;
  minValue2: number = 10;
  maxValue2: number = 50;
  status: boolean = false;
  clickEvent(){
    this.status = !this.status;
}
  propertyTypes:any = []
  selectedPropertyType :any;
  LoadPropertyCategories(){
    this.service.PropertyCategories().subscribe(e=>{
        let temp: any = e;
        for (let list of temp.data) {
          if(this.selectedPropertyType == null){
            if(list.id == this.PropertyCategoryId){
              this.selectedPropertyType = list.id;
            }
          }
          this.propertyTypes.push({ name: list.categoryName, id: list.id });
        }
    });
  }

  ngOnInit(): void {
  }

}
