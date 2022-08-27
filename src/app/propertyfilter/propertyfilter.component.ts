import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../service/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import { Options } from '@angular-slider/ngx-slider';
import {RentpropertiesComponent} from "../pages/rentproperties/rentproperties.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
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
  DistrictsId:any = [];
  DistrictsValue:any = [];

  ngOnInit(): void {
    //parent method
    // this.childToParentDataLoad.emit('hikmat')
  }


  separatorKeysCodes1: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];
  KeyWords :any = []
  keyWordsUrlValue :any = []


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  totalPropertyRecord :any;
  constructor(private activeRoute: ActivatedRoute,private service:AppService,private api: AppService,private route:Router,private modalService: NgbModal) {

    this.totalPropertyRecord = localStorage.getItem('propertyListingTotalRecord');
    this.type                 = this.activeRoute.snapshot.queryParamMap.get('type');
    this.PropertyCategoryId   = this.activeRoute.snapshot.queryParamMap.get('PropertyCategoryId');
    this.RentTypeId           = this.activeRoute.snapshot.queryParamMap.get('RentTypeId');
    this.PropertyListingTypeId = this.activeRoute.snapshot.queryParamMap.get('PropertyListingTypeId');
    this.PropertyAddress       = this.activeRoute.snapshot.queryParamMap.get('PropertyAddress');
    this.PriceStart            = this.activeRoute.snapshot.queryParamMap.get('PriceStart');
    this.PriceEnd              = this.activeRoute.snapshot.queryParamMap.get('PriceEnd');
    this.Bedrooms              = this.activeRoute.snapshot.queryParamMap.get('Bedrooms');
    this.selectedBeds = this.Bedrooms;
    this.Bathrooms              = this.activeRoute.snapshot.queryParamMap.get('Bathrooms');
    this.selectedBaths = this.Bathrooms;

    let DistrictsId :any = this.activeRoute.snapshot.queryParamMap.get('DistrictIds');
    let DistrictsValue :any = this.activeRoute.snapshot.queryParamMap.get('DistrictsValue');
    this.DistrictsId = JSON.parse(DistrictsId)
    this.DistrictsValue = JSON.parse(DistrictsValue)
    let KeyWords :any = this.activeRoute.snapshot.queryParamMap.get('KeyWords');
    let PropertyFeatureIds :any = this.activeRoute.snapshot.queryParamMap.get('PropertyFeatureIds');
    let MinCarpetArea :any = this.activeRoute.snapshot.queryParamMap.get('MinCarpetArea');
    let MaxCarpetArea :any = this.activeRoute.snapshot.queryParamMap.get('MaxCarpetArea');
    let FurnishingTypeId :any = this.activeRoute.snapshot.queryParamMap.get('FurnishingTypeId');
    this.KeyWords = JSON.parse(KeyWords)
    if(PropertyFeatureIds == null){
      PropertyFeatureIds = []
    }else{
      PropertyFeatureIds = JSON.parse(PropertyFeatureIds)
    }
    if(this.KeyWords !== null){
      this.KeyWords.forEach((element, i) => {
        this.keyWordsUrlValue.push({name:element})
      })
    }
    this.propertyFeatureIds = PropertyFeatureIds
    this.minCarpet = MinCarpetArea
    this.maxCarpet = MaxCarpetArea
    this.furnishedType = FurnishingTypeId

    this.getLoaction({"Searching":"","CountryId":"1"});

    if(this.DistrictsValue !== null){
      this.fruits = this.DistrictsValue
    }

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );

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


  locationOnSearchData :any = []
  getLoaction(data:any){
    let tempData :any = []
    let tempCompleteData :any = []
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data=>{
      let response: any = data;
      response.data.locationAutoComplete.forEach((element, i) => {
        tempData.push(element.item2);
        tempCompleteData.push({'id':element.item1,'value':element.item2})
      })
    });
    this.allFruits = tempData
    this.locationOnSearchData = tempCompleteData
  }



  add1(event: MatChipInputEvent): void {

    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove1(fruit: string): void {

    let removeId :any;
    this.locationOnSearchData.forEach((element, i) => {
      if(element.value == fruit){
        removeId = element.id
      }
    })

    let companyIndex :number = this.DistrictsId.indexOf(removeId);
    if (companyIndex !== -1) {
      this.DistrictsId.splice(companyIndex, 1);
    }

    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.locationOnSearchData.forEach((element, i) => {
      if(element.value == event.option.viewValue){
        this.DistrictsId.push(element.id)
      }
    })
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
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
                this.type = list.name.trim()
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
    minCarpet : new FormControl(""),
    maxCarpet : new FormControl(""),
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
    this.selectedRentType = event.value
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

    let keywordsData :any = [];
    this.Keywords.forEach((element, i) => {
      keywordsData.push(element.name)
    })

    this.loadType();
    let params :any = {type:this.type,"PropertyTypeIds":[],"RentTypeId":this.RentTypeId,
      "PropertyCategoryId":this.PropertyCategoryId,PriceStart:this.SubmitForm.value.PriceStart,PriceEnd:this.SubmitForm.value.PriceEnd,
      Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,PropertyAddress:this.SubmitForm.value.Name,
      "PropertyListingTypeId":this.PropertyListingTypeId,CurrentPage:1,DistrictIds:JSON.stringify(this.DistrictsId),
      DistrictsValue:JSON.stringify(this.DistrictsValue),KeyWords:JSON.stringify(keywordsData),PropertyFeatureIds:JSON.stringify(this.propertyFeatureIds),
      MinCarpetArea:this.minCarpet,MaxCarpetArea:this.maxCarpet,FurnishingTypeId:this.furnishedType
    }
    let objects :any = {type:this.type,"PropertyTypeIds":[],"RentTypeId":this.RentTypeId,
      "PropertyCategoryId":this.PropertyCategoryId,PriceStart:this.SubmitForm.value.PriceStart,PriceEnd:this.SubmitForm.value.PriceEnd,
      Bedrooms:this.Bedrooms,Bathrooms:this.Bathrooms,PropertyAddress:this.SubmitForm.value.Name,
      "PropertyListingTypeId":this.PropertyListingTypeId,CurrentPage:1,DistrictIds:this.DistrictsId,KeyWords:keywordsData
      ,PropertyFeatureIds:this.propertyFeatureIds,FurnishingTypeId:this.furnishedType,
      MinCarpetArea:this.minCarpet,MaxCarpetArea:this.maxCarpet
    }
    this.route.navigate(['/search'],{queryParams:params})
    this.childToParentDataLoad.emit(objects)

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
      "PropertyListingTypeId":'',CurrentPage:1,DistrictIds:JSON.stringify(this.DistrictsId),DistrictsValue:JSON.stringify(this.fruits)
    }

    let object :any = {type:'',"PropertyTypeIds":[], "PropertyAddress":'',"RentTypeId":'',
      "PropertyCategoryId":'',PriceStart:'',PriceEnd:'', Bedrooms:'',Bathrooms:'',
      "PropertyListingTypeId":'',CurrentPage:1,DistrictIds:[]
    }

    this.route.navigate(['/search'],{queryParams:params})
    this.childToParentDataLoad.emit(object)
  }
  modelPropertyPictures :any=[]
  openVerticallyCentered(content) {
    console.log(this.propertyFeatureIds)
    this.SubmitForm.controls.minCarpet.setValue(this.minCarpet);
    this.SubmitForm.controls.maxCarpet.setValue(this.maxCarpet);


    this.modalService.open(content, { centered: true });
  }

// Keywords
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Keywords: KeywordString[] = this.keyWordsUrlValue;

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


  furnishedType :any = '';
  furnishedTypeChange(data :any){
    this.furnishedType = data
  }

  propertyFeatureIds :any = [];
  propertyFeatureChange(data :any){
    let checkExists :any = true;
    this.propertyFeatureIds.forEach((element, i) => {
      if(element == data){
        checkExists = false;
      }
    })


    if(checkExists){
      this.propertyFeatureIds.push(data)
    }else{
      const index = this.propertyFeatureIds.indexOf(data);
      if (index >= 0) {
        this.propertyFeatureIds.splice(index, 1);
      }
    }
  }


  minCarpet : any = ''
  minCarpetAreaChange(searchValue: any): void {
    this.minCarpet = searchValue
    console.log(this.minCarpet)
  }
  maxCarpet : any = ''
  maxCarpetAreaChange(searchValue: any): void {
    this.maxCarpet = searchValue
    console.log(this.maxCarpet)
  }

}
