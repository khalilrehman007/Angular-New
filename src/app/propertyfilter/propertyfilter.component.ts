import { Component,OnInit,Output,EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../service/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import { Options } from '@angular-slider/ngx-slider';
import {RentpropertiesComponent} from "../pages/rentproperties/rentproperties.component";

@Component({
  selector: 'app-propertyfilter',
  templateUrl: './propertyfilter.component.html',
  styleUrls: ['./propertyfilter.component.scss']
})
export class PropertyfilterComponent implements OnInit {

  @Output() childToParentDataLoad:EventEmitter<any> = new EventEmitter<any>()

  type :any;
  PropertyCategoryId :any;
  RentTypeId :any;
  PropertyTypeListingId :any;
  PropertyAddress :any;
  PriceStart :any;
  PriceEnd :any;
  minValue: number;
  maxValue: number;
  Monthly: any;
  MonthlyAr: any;
  Quarterly: any;
  QuarterlyAr: any;
  Yearly: any;
  YearlyAr: any;
  data :any = {}

  ngOnInit(): void {
    //parent method
    // this.childToParentDataLoad.emit('hikmat')
  }

  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router) {
    this.type                 = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId   = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId         = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyTypeListingId = this.activeRoute.snapshot.queryParamMap.get('PropertyTypeListingId');
    this.PropertyAddress       = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart            = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd              = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');

    this.minValue = this.PriceStart;
    this.maxValue = this.PriceEnd;


    this.SubmitForm.controls.Name.setValue(this.PropertyAddress);
    this.loadType();
    this.LoadPropertyCategories();
    this.service.RentTypes().subscribe(data=>{
      let response: any = data;
      this.Monthly    = response.data[0].name;
      this.Quarterly    = response.data[1].name;
      this.Yearly    = response.data[2].name;
    });

    this.rentTypeIdCheck()
  }
  RentTypeIndexId:number;
  public rentTypeIdCheck() {
    // const tabCount = 3;
    // this.RentTypeId = (this.RentTypeId + 1) % tabCount;

    let RentTypeIndexId :number = 0;
    if(this.RentTypeId == 2){
      RentTypeIndexId = 1;
    }else if(this.RentTypeId == 3){
      RentTypeIndexId = 2;
    }
    this.RentTypeIndexId = RentTypeIndexId;

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
    PriceStart : new FormControl(""),
    PriceEnd : new FormControl(""),
  });

  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return value +  'AED';
    }
  };

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


  changeType(event) {
    this.data.type = event.value
  }
  propertyType(event) {
    this.data.propertyType = event.value
  }
  bhkType(event) {
    this.data.bhkType = event.value
  }
  bedBaths(event) {
    this.data.bedBath = event.value
  }
  postedBy(event) {
    this.data.postedBy = event.value
  }

  getRentalType(e:any){
    if(e.tab.textLabel == "Monthly"){
      this.data.rentalTypeId = 1;
    }else if(e.tab.textLabel == "Quarterly"){
      this.data.rentalTypeId = 2;
    }else if(e.tab.textLabel == "Yearly"){
      this.data.rentalTypeId = 3;
    }
  }


  proceedSearch(){

    console.log(this.data)
    console.log(this.SubmitForm.value)

    console.log('teststststst')

    // console.log(this.propertyCategory,'CategoryId')
    // console.log(this.data.rentalTypeId,'rentalTypeId')
    // console.log(this.data.PropertyTypeListingId,'PropertyTypeListingId')
    // console.log(this.SubmitForm.value)

  }



}
