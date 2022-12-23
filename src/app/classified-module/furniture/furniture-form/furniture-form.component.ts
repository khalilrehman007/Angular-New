import { AbstractType, Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
@Component({
  selector: 'app-furniture-form',
  templateUrl: './furniture-form.component.html',
  styleUrls: ['./furniture-form.component.scss']
})
export class FurnitureFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  Age : any =[];
  AccessoriesUsage: any =[];
  ToolCondition: any =[];
  constructor( private service : AppService) {
    this.service.GetClassifiedLookUpsByCategory("Age").subscribe((result:any) => {
      this.Age = result.data;     
    })
    this.service.GetClassifiedLookUpsByCategory("AccessoriesUsage").subscribe((result:any) => {
      this.AccessoriesUsage= result.data;           
    })
    this.service.GetClassifiedLookUpsByCategory("ToolCondition").subscribe((result:any) => {
      this.ToolCondition= result.data;                 
    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

