import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
@Component({
  selector: 'app-jobs-hiring-form',
  templateUrl: './jobs-hiring-form.component.html',
  styleUrls: ['./jobs-hiring-form.component.scss']
})
export class JobsHiringFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  Gender :any =[];
  Nationality:any =[];
  Language:any =[];
  CareerLevel:any =[];
  EmploymentType:any =[];
  WorkExperience:any =[];
  MonthlySalary:any =[];
  JobBenefits:any =[];
  CompanySize:any =[];
  CompanyListedBy:any =[];
  constructor(private service : AppService) { 
    this.service.GetClassifiedLookUpsByCategory("Gender").subscribe((result:any) => {
      this.Gender= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Nationality").subscribe((result:any) => {
      this.Nationality= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Language").subscribe((result:any) => {
      this.Language= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("CareerLevel").subscribe((result:any) => {
      this.CareerLevel= result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("EmploymentType").subscribe((result:any) => {
      this.EmploymentType= result.data;      
    })
    this.service.GetClassifiedLookUpsByCategory("WorkExperience").subscribe((result:any) => {
      this.WorkExperience= result.data;                  
    })
    this.service.GetClassifiedLookUpsByCategory("MonthlySalary ").subscribe((result:any) => {
      this.MonthlySalary= result.data;                  
      
    })
    this.service.GetClassifiedLookUpsByCategory("JobBenefits ").subscribe((result:any) => {
      this.JobBenefits= result.data;                  
      
    })
    this.service.GetClassifiedLookUpsByCategory("CompanySize ").subscribe((result:any) => {
      this.CompanySize= result.data;                  
      
    })
    this.service.GetClassifiedLookUpsByCategory("CompanyListedBy ").subscribe((result:any) => {
      this.CompanyListedBy= result.data;                  
      
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
}

