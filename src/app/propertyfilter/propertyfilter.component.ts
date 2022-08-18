import { Component,OnInit,Output,EventEmitter} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../service/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import { Options } from '@angular-slider/ngx-slider';
import {RentpropertiesComponent} from "../pages/rentproperties/rentproperties.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface KeywordString {
  name: string;
}
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
  PropertyListingTypeId :any;
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
  Bedrooms: any;
  Bathrooms: any;
  postedById: any;
  data :any = {}
  selectedBeds :any;
  selectedBaths :any;
  furnishingType: any;
  propertyListingFeatures: any;
  postedByOption: any;
  

  ngOnInit(): void {
    //parent method
    // this.childToParentDataLoad.emit('hikmat')
  }

  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router,private modalService: NgbModal) {
    this.type                 = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId   = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId           = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    this.PropertyAddress       = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart            = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd              = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');
    this.Bedrooms              = this.activeRoute.snapshot.queryParamMap.get('Bedrooms');
    this.Bathrooms              = this.activeRoute.snapshot.queryParamMap.get('Bathrooms');

    this.minValue = this.PriceStart;
    this.maxValue = this.PriceEnd;

    if(this.type == null){
      this.activeRoute.params.subscribe(params => {
        if(params['type'] == 'Buy'){
          this.PropertyListingTypeId = 2;
          this.type = 'Buy'
        }else if(params['type'] == 'Rent'){
          this.PropertyListingTypeId = 1;
          this.type = 'Rent';
        }
      });
    }

    this.api.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
    });
    this.api.PropertyListingFeatures().subscribe((result: any) => {
      this.propertyListingFeatures = result.data;
    });
    this.api.ProfessionalTypes().subscribe((result: any) => {
      this.postedByOption = result.data;
    });

    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;

    this.SubmitForm.controls.Name.setValue(this.PropertyAddress);
    this.loadType();
    this.LoadPropertyCategories();

    this.service.RentTypes().subscribe(data=>{
      let response: any = data;
      this.Monthly   = response.data[0].name;
      this.Quarterly = response.data[1].name;
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

  // public options2 = [
  //   {"id": 1, "name": "Rent"},
  //   {"id": 2, "name": "Buy"}
  // ]

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
    this.PropertyListingTypeId = event.value
  }
  propertyType(event) {
    this.PropertyCategoryId = event.value
  }

  baths(event) {
    this.Bathrooms = event.value
  }
  beds(event) {
    this.Bedrooms = event.value
  }
  postedBy(event) {
    this.postedById = event.value
  }

  getRentalType(e:any){
    if(e.tab.textLabel == "Monthly"){
      this.RentTypeId = 1;
    }else if(e.tab.textLabel == "Quarterly"){
      this.RentTypeId = 2;
    }else if(e.tab.textLabel == "Yearly"){
      this.RentTypeId = 3;
    }
  }


  proceedSearch(){
    let params :any = {type:this.type,"PropertyTypeIds":[],"RentTypeId":this.RentTypeId,
      "PropertyCategoryId":this.PropertyCategoryId,PriceStart:this.SubmitForm.value.PriceStart,PriceEnd:this.SubmitForm.value.PriceEnd,
      Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,PropertyAddress:this.SubmitForm.value.Name,
      "PropertyListingTypeId":this.PropertyListingTypeId,CurrentPage:1
    }
    this.route.navigate(['/search'],{queryParams:params})
    this.childToParentDataLoad.emit(params)

  }

  clearSearch(){
    this.type                 = ''
    this.PropertyCategoryId   = ''
    this.RentTypeId           = ''
    this.PropertyListingTypeId =''
    this.PropertyAddress       = ''
    this.PriceStart            = ''
    this.PriceEnd              =''
    this.Bedrooms              = ''
    this.Bathrooms             =''
    this.selectedRentType      =''
    this.selectedBeds          =''
    this.selectedBaths         =''

    this.SubmitForm.controls.Name.setValue('');
    this.SubmitForm.controls.PriceStart.setValue('');
    this.SubmitForm.controls.PriceEnd.setValue('');


    this.selectedPropertyType = null
    this.propertyTypes = []
    this.LoadPropertyCategories();

    let params :any = {type:'',"PropertyTypeIds":[], "PropertyAddress":'',"RentTypeId":'',
      "PropertyCategoryId":'',PriceStart:'',PriceEnd:'', Bedrooms:'',Bathrooms:'',
      "PropertyListingTypeId":'',CurrentPage:1
    }
    this.route.navigate(['/search'],{queryParams:params})
    this.childToParentDataLoad.emit(params)
  }
  modelPropertyPictures :any=[]
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

// Keywords
addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Keywords: KeywordString[] = [{name: 'Property'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Keywords.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: KeywordString): void {
    const index = this.Keywords.indexOf(fruit);

    if (index >= 0) {
      this.Keywords.splice(index, 1);
    }
  }
}
