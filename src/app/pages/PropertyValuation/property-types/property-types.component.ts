import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent implements OnInit {

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

  unitHMTL: any = [{ show: true, id: 1 }];

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
  ];
  propertyTypeForm = new FormGroup({
    apartmentNo: new FormControl("", Validators.required),
    constructionAge: new FormControl("", Validators.required),
    elevation: new FormControl("", Validators.required),
    apartmentSize: new FormControl("", Validators.required),
    buildupArea: new FormControl("", Validators.required),
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
  constructor(private service: AppService,) {
    this.formData = (window.localStorage.getItem('valuationData'));
    this.formData = JSON.parse(this.formData);
    this.loadFurnishingType();
    this.loadFittingType();
  }

  ngOnInit(): void {
    this.service.PropertyUnitTypes().subscribe((result: any) => {
      this.propertyUnits = result.data;
    })
  }
  status: boolean = false;
  addamenties(){
      this.status = !this.status;
  }
  loadType(e: number) {
    this.formData.PropertyCategoryId = e;
    this.typeSelected = false;
    this.propertyType = [];
    this.service.LoadType(e).subscribe((result) => {
      this.propertyType = result;
      this.propertyType = this.propertyType.data
    })
  }
  valuationPurpose(e: any) {
    this.formData.PropertyTypeId = e.value;
    this.purposeOfValuation = [];
    this.featuresData = [];
    this.propertyData = this.propertyType.filter(item => item.id == e.value)[0];
    this.service.ValuationPurpose().subscribe((result) => {
      this.purposeOfValuation = result;
      this.purposeOfValuation = this.purposeOfValuation.data;
    });
    this.service.PropertyFeatures(this.propertyData.id).subscribe((result: any) => {
      this.featuresData = result.data;
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
  propertyStatus(id: any) {
    this.formData.PropertyStatusId = id;
  }
  onPurposeSelect(e: any) {
    this.formData.ValuationPurposeId = e.value;
  }
  getRoads(id: any) {
    this.formData.NoOfRoads = id;
  }
  getBeds(e: any) {
    this.formData.Bedrooms = e.value;
  }
  getBathroom(e: any) {
    this.formData.Bathrooms = e.value;
  }
  getFurnishingType(id: number) {
    this.formData.FurnishingType = id;
  }
  getFittingType(id: number) {
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
  getData() {
    this.formData.PlotNo = this.propertyTypeForm.value.apartmentNo;
    this.formData.PlotSize = this.propertyTypeForm.value.apartmentSize;
    this.formData.BuildupArea = this.propertyTypeForm.value.buildupArea;
    this.formData.Elevation = this.propertyTypeForm.value.elevation;
    this.formData.ConstructionAge = this.propertyTypeForm.value.constructionAge;
    console.log(this.formData);
  }
}
