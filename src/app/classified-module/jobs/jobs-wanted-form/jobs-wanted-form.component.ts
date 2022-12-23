import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-jobs-wanted-form',
  templateUrl: './jobs-wanted-form.component.html',
  styleUrls: ['./jobs-wanted-form.component.scss']
})
export class JobsWantedFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  file: any;
  Gender: any=[];
  Nationality : any= [];
  Language: any= [];
  NoticePeriod : any= [];
  VisaStatus : any= [];
  Career : any= [];
  MonthlySalary : any= [];
  WorkExperience : any= [];
  constructor(private service : AppService) {
    this.service.GetClassifiedLookUpsByCategory("Gender").subscribe((result:any) => {
      this.Gender = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Nationality").subscribe((result:any) => {
      this.Nationality  = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Language").subscribe((result:any) => {
      this.Language  = result.data;
      
    })
    this.service.GetClassifiedLookUpsByCategory("NoticePeriod ").subscribe((result:any) => {
      this.NoticePeriod   = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("VisaStatus  ").subscribe((result:any) => {
      this.VisaStatus = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Career").subscribe((result:any) => {
      this.Career = result.data;      
    })
    this.service.GetClassifiedLookUpsByCategory("MonthlySalary ").subscribe((result:any) => {
      this.MonthlySalary = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("WorkExperience ").subscribe((result:any) => {
      this.WorkExperience= result.data;
    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
  }
   handleChange(a: any) {
      this.file = a.target.files[0].name;
  }
}

