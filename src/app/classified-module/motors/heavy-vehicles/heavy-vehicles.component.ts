import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
@Component({
  selector: 'app-heavy-vehicles',
  templateUrl: './heavy-vehicles.component.html',
  styleUrls: ['./heavy-vehicles.component.scss']
})
export class HeavyVehiclesComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  FuelType : any =[];
  BodyCondition : any =[];
  MechanicalCondition : any =[];
  SellerType : any =[];
  Warranty : any =[];
  Cylinders : any =[];
  HorsePower : any =[];
  constructor( private service : AppService) { 
    this.service.GetClassifiedLookUpsByCategory( "FuelType").subscribe((result:any) => {
      this.FuelType = result.data;
      console.log(this.FuelType);
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result:any) => {
      this.BodyCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory( "MechanicalCondition").subscribe((result:any) => {
      this.MechanicalCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType").subscribe((result:any) => {
      this.SellerType= result.data;
      
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty ").subscribe((result:any) => {
      this.Warranty= result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("Cylinders").subscribe((result:any) => {
      this.Cylinders = result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("HorsePower").subscribe((result:any) => {
      this.HorsePower = result.data;
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

