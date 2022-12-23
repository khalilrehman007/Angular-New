import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  MobilePhoneAge : any=[];
  MobilePhoneCondition: any=[];
  Color: any=[];
  Warranty : any=[];
  DeviceDamageType: any=[];
  DeviceBatteryHealth: any=[];
  DeviceVersionType: any=[];
  DeviceAccompaniments: any=[];
  DeviceStorageType : any=[];
  DeviceMemoryType: any=[];
  constructor( private service : AppService) {
    this.service.GetClassifiedLookUpsByCategory("MobilePhoneAge ").subscribe((result:any) => {
      this.MobilePhoneAge = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("MobilePhoneCondition ").subscribe((result:any) => {
      this.MobilePhoneCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Color").subscribe((result:any) => {
      this.Color = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty ").subscribe((result:any) => {
      this.Warranty = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceDamageType ").subscribe((result:any) => {
      this.DeviceDamageType= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceBatteryHealth ").subscribe((result:any) => {
      this.DeviceBatteryHealth= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceVersionType").subscribe((result:any) => {
      this.DeviceVersionType= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceAccompaniments").subscribe((result:any) => {
      this.DeviceAccompaniments= result.data;   
    })
    this.service.GetClassifiedLookUpsByCategory("DeviceStorageType ").subscribe((result:any) => {
      this.DeviceStorageType = result.data;
      })
    this.service.GetClassifiedLookUpsByCategory("DeviceMemoryType  ").subscribe((result:any) => {
      this.DeviceMemoryType = result.data;
      })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

