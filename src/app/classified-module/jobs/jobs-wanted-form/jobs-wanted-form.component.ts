import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-jobs-wanted-form',
  templateUrl: './jobs-wanted-form.component.html',
  styleUrls: ['./jobs-wanted-form.component.scss']
})
export class JobsWantedFormComponent implements OnInit {
  ads= 'assets/images/post-add.jpg'
  error: any = ""
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
    this.animate();
  }
  animate() {
    let temp: any = $("." + this.currentField).offset()?.top;
    $("." + this.currentField).addClass("blink");
    $("." + this.currentField).on("click", () => {
      $("." + this.currentField).removeClass("blink");
    })
    $(window).scrollTop(temp - 100);
  }
  currentField: any;
  file: any;
  Gender: any=[];
  Nationality : any= [];
  Language: any= [];
  NoticePeriod : any= [];
  VisaStatus : any= [];
  Career : any= [];
  MonthlySalary : any= [];
  WorkExperience : any= [];
  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Company: new FormControl("", Validators.required),
  });
  constructor(private service : AppService, private router : Router) {
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
    $('.select2').select2();
    $('input[type="number"]').on('input', (e) => {
      let temp: any = $(e.currentTarget).val();
      temp.replace(/[^0-9 +]+/, '');
      $(e.currentTarget).val(temp);
    });
  }
   handleChange(a: any) {
      this.file = a.target.files[0].name;
  }
  onSubmit() {
    if (this.DetailsForm.value.title == "") {
      this.currentField = "title-input";
      this.error = "Enter Title";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Phone == "") {
      this.currentField = "phone-input";
      this.error = "Enter Phone Number";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Description == "") {
      this.currentField = "description-input";
      this.error = "Enter Price";
      this.showError = true;
      return;
    } else if ($(".Gender").val() == 0) {
      this.currentField = "Gender + .select2";
      this.error = "Enter Gender";
      this.showError = true;
      return;
    } else if ($(".nationality").val() == 0) {
      this.currentField = "nationality + .select2";
      this.error = "Enter Nationality";
      this.showError = true;
      return;
    } else if ($(".Current-location").val() == 0) {
      this.currentField = "Current-location + .select2";
      this.error = "Enter Current Location";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Company == "") {
      this.currentField = "company-input";
      this.error = "Enter Current Comapany";
      this.showError = true;
      return;
    } else if ($(".notice-period-input").val() == 0) {
      this.currentField = "notice-period-input + .select2";
      this.error = "Enter Notice Period";
      this.showError = true;
      return;
    } else if ($(".visa-status-inputs").val() == 0) {
      this.currentField = "visa-status-inputs+ .select2";
      this.error = "Enter Visa Status";
      this.showError = true;
      return;
    } else if ($(".career-level-input").val() == 0) {
      this.currentField = "career-level-input + .select2";
      this.error = "Enter Career Level";
      this.showError = true;
      return;
    } else if ($(".work-experience-input").val() == 0) {
      this.currentField = "work-experience-input + .select2";
      this.error = "Enter Work Exerience";
      this.showError = true;
      return;
    } else if ($(".education-level-input").val() == 0) {
      this.currentField = "education-level-input + .select2";
      this.error = "Enter Educaton Level";
      this.showError = true;
      return;
    } else if ($(".monthly-salary-input").val() == 0) {
      this.currentField = "monthly-salary-input + .select2";
      this.error = "Enter Monthly Salary";
      this.showError = true;
      return;
    } else if ($(".commitment-input").val() == 0) {
      this.currentField = "commitment-input + .select2";
      this.error = "Enter Commitment";
      this.showError = true;
      return;
    }
  }
}

