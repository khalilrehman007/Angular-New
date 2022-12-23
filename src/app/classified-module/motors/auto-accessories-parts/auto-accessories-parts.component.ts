import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-auto-accessories-parts',
  templateUrl: './auto-accessories-parts.component.html',
  styleUrls: ['./auto-accessories-parts.component.scss']
})
export class AutoAccessoriesPartsComponent implements OnInit {
  ads = 'assets/images/post-add.jpg'
  AccessoriesUsage: any = [];
  SellerType : any = [];
  ToolCondition : any = [];
  constructor(private service: AppService) {
    this.service.GetClassifiedLookUpsByCategory("AccessoriesUsage").subscribe((result:any) => {
      this.AccessoriesUsage = result.data;
      console.log(this.AccessoriesUsage)
    })
    this.service.GetClassifiedLookUpsByCategory("ToolCondition").subscribe((result:any) => {
      this.ToolCondition = result.data;
      console.log(this.ToolCondition)
    })
    this.service.GetClassifiedLookUpsByCategory("SellerType ").subscribe((result:any) => {
      this.SellerType  = result.data;
      console.log(this.SellerType )
    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
  }
}
