import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent implements OnInit {
  selected = 'option1';
  @ViewChild('unitWrapper') unitWrapper: ElementRef;

  plus = '../../../../assets/images/plus.svg';
  minus = '../../../../assets/images/minus.svg';

  formData: any;
  propertyData: any;
  typeSelected: boolean = false;
  propertyType: any = [];
  purposeOfValuation: any = [];
  statusData: number = 0;
  featuresData: any;
  propertyUnits: any;
  furnishingType: any;
  fittingType: any;
  featuresFormData: any = [];
  roadCount: number = 0;
  formDetailData: any = {};
  totalExpenseWrapper: boolean = false;
  showLoader: boolean = false;

  unitHMTL: any = [];
  error: any = ""
  showError:boolean = false;
  errorResponse(data:any){
    this.showError = false;
  }

  room = [
    { viewValue: '01', value: '01' },
    { viewValue: '02', value: '02' },
    { viewValue: '03', value: '03' },
    { viewValue: '04', value: '04' },
    { viewValue: '05', value: '05' },
    { viewValue: '06', value: '06' },
    { viewValue: '07', value: '07' },
    { viewValue: '08', value: '08' },
    { viewValue: '09', value: '09' },
    { viewValue: '10', value: '10' },
    { viewValue: '10+', value: '10+' },
  ];
  propertyTypeForm = new FormGroup({
    apartmentNo: new FormControl("", Validators.required),
    constructionAge: new FormControl("", Validators.required),
    elevation: new FormControl("", Validators.required),
    apartmentSize: new FormControl("", Validators.required),
    buildupArea: new FormControl("", Validators.required),
    income: new FormControl("", Validators.required),
    expense: new FormControl("", Validators.required),
  })
  get apartmentNo() {
    return this.propertyTypeForm.get("apartmentNo");
  }
  get constructionAge() {
    return this.propertyTypeForm.get("constructionAge");
  }
  get elevation() {
    return this.propertyTypeForm.get("elevation");
  }
  get apartmentSize() {
    return this.propertyTypeForm.get("apartmentSize");
  }
  get buildupArea() {
    return this.propertyTypeForm.get("buildupArea");
  }
  get income() {
    return this.propertyTypeForm.get("income");
  }
  get expense() {
    return this.propertyTypeForm.get("expense");
  }
  constructor(private service: AppService, private router: Router) {
    this.formData = (window.localStorage.getItem('valuationData'));
    this.formData = JSON.parse(this.formData);
    this.loadFurnishingType();
    this.loadFittingType();
    this.formDetailData = localStorage.getItem("valuationDetailData");
    this.formDetailData = JSON.parse(this.formDetailData);
    this.formData.FurnishingType = 0;
    this.formData.FittingType = 0;
    this.formData.Bedrooms = 0;
    this.formData.Bathrooms = 0;
  }

  ngOnInit(): void {
    this.service.PropertyUnitTypes().subscribe((result: any) => {
      this.propertyUnits = result.data;
    })
  }
  status: boolean = false;
  addamenties() {
    this.status = !this.status;
  }
  loadType(e: number) {
    this.showLoader = true;
    if (e == 1) {
      this.formDetailData.propertyCategory = "Residential";
    } else {
      this.formDetailData.propertyCategory = "Commercial";
    }
    this.formData.PropertyCategoryId = e;
    this.typeSelected = false;
    this.propertyType = [];
    this.service.LoadTypebyLatLng({ id: e, lat: this.formData.PropertyLat, lng: this.formData.PropertyLong }).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
      this.showLoader = false;
    })
  }
  valuationPurpose(e: any) {
    this.showLoader = true;
    this.formDetailData.propertyType = this.propertyType.filter(item => item.id == e.value)[0].typeDescription;
    this.formData.PropertyTypeId = e.value;
    this.purposeOfValuation = [];
    this.featuresData = [];
    this.propertyData = this.propertyType.filter(item => item.id == e.value)[0];
    if (this.propertyData.hasUnits) {
      this.unitHMTL = [{ show: true, id: 1 }];
    }
    this.service.ValuationPurpose().subscribe((result) => {
      this.purposeOfValuation = result;
      this.purposeOfValuation = this.purposeOfValuation.data;
    });
    this.service.PropertyFeatures(this.propertyData.id).subscribe((result: any) => {
      this.featuresData = result.data;
      this.showLoader = false;
    })
    this.typeSelected = true;
  }
  loadFurnishingType() {
    this.service.FurnishingTypes().subscribe((result: any) => {
      this.furnishingType = result.data;
    })
  }
  loadFittingType() {
    this.service.FittingTypes().subscribe((result: any) => {
      this.fittingType = result.data;
    })
  }
  propertyStatus(id: any, name: any) {
    if (name == "Leased") {
      this.totalExpenseWrapper = true;
    } else {
      this.totalExpenseWrapper = false;
    }
    this.formDetailData.PropertyStatus = name;
    this.formData.PropertyStatusId = id;
  }
  onPurposeSelect(e: any) {
    this.formDetailData.ValuationPurpose = this.purposeOfValuation.filter(item => item.id == e.value)[0].purposeDescription;
    this.formData.ValuationPurposeId = e.value;
  }
  getRoads(id: any) {
    this.formDetailData.roads = id;
    this.roadCount = id;
  }
  getBeds(e: any) {
    this.formDetailData.Bedrooms = e.value;
    this.formData.Bedrooms = e.value;
  }
  getBathroom(e: any) {
    this.formDetailData.Bathrooms = e.value;
    this.formData.Bathrooms = e.value;
  }
  getFurnishingType(id: number, name: any) {
    this.formDetailData.Furnishing = name;
    this.formData.FurnishingType = id;
  }
  getFittingType(id: number, name: any) {
    this.formDetailData.Fitting = name;
    this.formData.FittingType = id;
  }
  getFeaturesData(id: number) {
    if (this.featuresFormData.indexOf(id) == -1) {
      this.featuresFormData.push(id);
    } else {
      this.featuresFormData = this.featuresFormData.filter((e: any) => e != id)
    }
  }
  mapFeaturesFormData() {

  }
  addUnits() {
    this.unitHMTL.push({ show: true, id: this.unitHMTL[this.unitHMTL.length - 1].id + 1 });
  }
  removeUnits(e: any) {
    for (let i = 0; i < this.unitHMTL.length; i++) {
      if (this.unitHMTL[i].id == e) {
        this.unitHMTL[i].show = false;
      }
    }
  }
  getValue()  {
    let age:any = this.propertyTypeForm.value.constructionAge;
    if(age > 40) {
      this.error = "The construction age can't be greater than 40 years.";
      this.propertyTypeForm.patchValue({
        constructionAge:"40"
      })
      this.showError = true;
    }
    console.log();
  }
  getData() {
    if(!this.formData.PropertyCategoryId) {
      this.error = "Please Select Property Category";
      this.showError = true;
      return;
    } else if(!this.formData.PropertyTypeId) {
      this.error = "Please Select Property Type";
      this.showError = true;
      return;
    } else if(!this.formData.ValuationPurposeId) {
      this.error = "Please Select Valuation Purpose";
      this.showError = true;
      return;
    } else if(!this.formData.PropertyStatusId) {
      this.error = "Please Select Property Status";
      this.showError = true;
      return;
    } else if(this.propertyTypeForm.value.apartmentNo == "") {
      this.error = "Please Enter Apartment No";
      this.showError = true;
      return;
    } else if(this.roadCount == 0) {
      this.error = "Please Select Number of Road";
      this.showError = true;
      return;
    } else if(this.propertyTypeForm.value.constructionAge == "") {
      this.error = "Please Enter Constrution Age";
      this.showError = true;
      return;
    } else if(this.propertyData.hasElevation && this.propertyTypeForm.value.elevation == "") {
      this.error = "Please Enter Elevation";
      this.showError = true;
      return;
    } else if(this.propertyTypeForm.value.apartmentSize == "") {
      this.error = "Please Enter Plot Size";
      this.showError = true;
      return;
    } else if(this.propertyTypeForm.value.buildupArea == "" && this.formData.FurnishingType) {
      this.error = "Please Enter Buildup Area";
      this.showError = true;
      return;
    } else if(!this.formData.Bedrooms) {
      this.error = "Please Select Bedrooms";
      this.showError = true;
      return;
    } else if(!this.formData.Bathrooms) {
      this.error = "Please Select Bathrooms";
      this.showError = true;
      return;
    } else if(this.propertyData.hasFurnishing && !this.formData.FurnishingType) {
      this.error = "Please Select Furnishing Type";
      this.showError = true;
      return;
    } else if(this.propertyData.hasFitting && !this.formData.FittingType) {
      this.error = "Please Select Fitting Type";
      this.showError = true;
      return;
    } else if(this.propertyData.hasPropertyFeature && this.featuresFormData.length == 0) {
      this.error = "Please Select Property Features";
      this.showError = true;
      return;
    } else if(this.formData.PropertyStatusId == 2 && this.propertyTypeForm.value.income  == "") {
      this.error = "Please Enter Total Income";
      this.showError = true;
      return;
    } else if(this.formData.PropertyStatusId == 2 && this.propertyTypeForm.value.expense  == "") {
      this.error = "Please Enter Total Expense";
      this.showError = true;
      return;
    }
    this.formDetailData.PlotNo = this.propertyTypeForm.value.apartmentNo;
    this.formDetailData.PlotNo = this.propertyTypeForm.value.elevation;
    if (this.propertyData.hasElevation) {
      this.formDetailData.elevation = this.propertyTypeForm.value.elevation;
    } else {
      this.formDetailData.elevation = 0;
    }
    this.formData.ConstructionAge = this.propertyTypeForm.value.constructionAge;
    this.formDetailData.PlotSize = this.propertyTypeForm.value.apartmentSize;
    if (this.propertyData.hasBuildUpArea) {
      this.formDetailData.BuildupArea = this.propertyTypeForm.value.buildupArea;
    } else {
      this.formDetailData.BuildupArea = 0;
    }

    this.formData.PlotNo = this.propertyTypeForm.value.apartmentNo;
    this.formData.PlotSize = this.propertyTypeForm.value.apartmentSize;
    this.formData.BuildupArea = this.propertyTypeForm.value.buildupArea;
    this.formData.Elevation = this.propertyTypeForm.value.elevation;
    this.formData.NoOfRoads = this.roadCount;
    this.formData.ValuationPropertyUnits = "";
    let temp: any = [];
    for (let i = 0; i < this.unitHMTL.length; i++) {
      if (this.unitHMTL[i].show) {
        temp.push({ PropertyUnitTypeId: $("#unit-wrapper-" + this.unitHMTL[i].id).find(".mat-select-min-line").text(), NumberOfUnit: $("#unit-wrapper-" + this.unitHMTL[i].id).find(".no-of-units").val(), Vacant: $("#unit-wrapper-" + this.unitHMTL[i].id).find(".vacant").val(), UnitSize: $("#unit-wrapper-" + this.unitHMTL[i].id).find(".size-sq-ft").val(), NumberOfBeds: $("#unit-wrapper-" + this.unitHMTL[i].id).find(".bedroom").val(), RentValue: $("#unit-wrapper-" + this.unitHMTL[i].id).find(".rent-value").val() });
      }
    }
    let unitName: any = [];
    let unitID: any = [];
    for (let i = 0; i < this.propertyUnits.length; i++) {
      unitName.push(this.propertyUnits[i].name);
      unitID.push(this.propertyUnits[i].id);
    }
    for (let i = 0; i < temp.length; i++) {
      temp[i].PropertyUnitTypeId = unitID[unitName.indexOf(temp[i].PropertyUnitTypeId)];
    }
    this.formDetailData.ValuationPropertyUnits = temp;
    this.formData.ValuationPropertyUnits = temp;
    temp = []
    for (let i = 0; i < this.featuresFormData.length; i++) {
      temp.push({ PropertyFeatureId: this.featuresFormData[i] });
    }
    this.formDetailData.PropertyFeatures = temp;
    this.formData.PropertyFeatures = temp;
    localStorage.setItem('valuationDetailData', JSON.stringify(this.formDetailData));
    localStorage.setItem('valuationData', JSON.stringify(this.formData));
    this.router.navigate(['/PropertyDocument']);
  }
}
