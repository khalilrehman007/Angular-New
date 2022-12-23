import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Select2 } from 'select2';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.scss']
})
export class BoatsComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  Age : any=[];
  BoatUsage: any=[];
  BoatCondition: any=[];
  SellerType: any=[];
  Warranty: any=[];
  Length : any=[];
  constructor(private service : AppService) {
    this.service.GetClassifiedLookUpsByCategory("Age").subscribe((result:any) => {
      this.Age = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory( "BoatUsage").subscribe((result:any) => {
      this.BoatUsage= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory( "BoatCondition").subscribe((result:any) => {
      this.BoatCondition= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory( "SellerType").subscribe((result:any) => {
      this.SellerType= result.data;
      
    })
    this.service.GetClassifiedLookUpsByCategory("Warranty").subscribe((result:any) => {
      this.Warranty= result.data;      
    })
    this.service.GetClassifiedLookUpsByCategory( "Length").subscribe((result:any) => {
      this.Length= result.data;
      
    })

   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

