import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-motorcycle-detail-form',
  templateUrl: './motorcycle-detail-form.component.html',
  styleUrls: ['./motorcycle-detail-form.component.scss']
})
export class MotorcycleDetailFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  SportsBikeUsage : any=[];
  SellerType : any=[];
  Warranty : any=[];
  FinalDriveSystem: any=[];
  Wheels: any=[];
  BikeManufacturer : any=[];
  BikeEngineSize : any =[];
  constructor( private service : AppService) {
    this.service.GetClassifiedLookUpsByCategory("SportsBikeUsage").subscribe((result:any) => {
      this.SportsBikeUsage = result.data;
      
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType ").subscribe((result:any) => {
      this.SellerType = result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty  ").subscribe((result:any) => {
      this.Warranty  = result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("FinalDriveSystem  ").subscribe((result:any) => {
      this.FinalDriveSystem= result.data; 
    })
    this.service.GetClassifiedLookUpsByCategory("Wheels").subscribe((result:any) => {
      this.Wheels= result.data;       
    })
    this.service.GetClassifiedLookUpsByCategory("BikeManufacturer").subscribe((result:any) => {
      this.BikeManufacturer = result.data;       
    })
    this.service.GetClassifiedLookUpsByCategory("BikeEngineSize ").subscribe((result:any) => {
      this.BikeEngineSize = result.data;       
    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}
