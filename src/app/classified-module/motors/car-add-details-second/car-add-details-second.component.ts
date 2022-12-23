import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-car-add-details-second',
  templateUrl: './car-add-details-second.component.html',
  styleUrls: ['./car-add-details-second.component.scss']
})
export class CarAddDetailsSecondComponent implements OnInit {
  advertize= 'assets/images/icons/atract.svg';
  info= 'assets/images/icons/info-icn.svg';
  FuelType:any = [];
  BodyCondition:any = [];
  MechanicalCondition:any = [];
  Color:any = [];
  Warranty:any = [];
  Doors:any = [];
  Cylinders:any = [];
  TransmissionType:any = [];
  BodyType:any = [];
  HorsePower:any = [];
  SteeringSide:any = [];
  CarExtraFeature:any = [];
  constructor(private service: AppService) {
    this.service.GetClassifiedLookUpsByCategory("FuelType").subscribe((result:any) => {
      this.FuelType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result:any) => {
      this.BodyCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("MechanicalCondition").subscribe((result:any) => {
      this.MechanicalCondition = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Color").subscribe((result:any) => {
      this.Color = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty").subscribe((result:any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Doors").subscribe((result:any) => {
      this.Doors = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Cylinders").subscribe((result:any) => {
      this.Cylinders = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("TransmissionType").subscribe((result:any) => {
      this.TransmissionType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("BodyType").subscribe((result:any) => {
      this.BodyType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("HorsePower").subscribe((result:any) => {
      this.HorsePower = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SteeringSide").subscribe((result:any) => {
      this.SteeringSide = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("CarExtraFeature").subscribe((result:any) => {
      this.CarExtraFeature = result.data;
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      $('.select2').select2();
    }
    status1: boolean = false;
    clickEvent1() {
      this.status1 = !this.status1;
    }
    status2: boolean = false;
    clickEvent2() {
      this.status2 = !this.status2;
    }
    
}

