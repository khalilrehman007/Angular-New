import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-car-add-details-first',
  templateUrl: './car-add-details-first.component.html',
  styleUrls: ['./car-add-details-first.component.scss']
})
export class CarAddDetailsFirstComponent implements OnInit {
  ads= 'assets/images/post-add.jpg';
  MakeAndModel:any = [];
  Trim:any = [];
  RegionalSpec:any = [];
  BodyCondition:any = [];
  constructor(private service : AppService) {
    this.service.GetClassifiedLookUpsByCategory("MakeAndModel").subscribe((result:any) => {
      this.MakeAndModel = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Trim").subscribe((result:any) => {
      this.Trim = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Regional Spec").subscribe((result:any) => {
      this.RegionalSpec = result.data;
      console.log(this.RegionalSpec);
    })
    this.service.GetClassifiedLookUpsByCategory("BodyCondition").subscribe((result:any) => {
      this.BodyCondition = result.data;
      console.log(this.BodyCondition);
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      $('.select2').select2();
    }
}
