import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-jobs-hiring-form',
  templateUrl: './jobs-hiring-form.component.html',
  styleUrls: ['./jobs-hiring-form.component.scss']
})
export class JobsHiringFormComponent implements OnInit {
  ads = 'assets/images/post-add.jpg'
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
  Gender: any = [];
  Nationality: any = [];
  Language: any = [];
  CareerLevel: any = [];
  EmploymentType: any = [];
  WorkExperience: any = [];
  MonthlySalary: any = [];
  JobBenefits: any = [];
  CompanySize: any = [];
  CompanyListedBy: any = [];
  DetailsForm = new FormGroup({
    title: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Skill1: new FormControl("", Validators.required),
    Skill2: new FormControl("", Validators.required),
    Skill3: new FormControl("", Validators.required),
    Skill4: new FormControl("", Validators.required),
    Companyname: new FormControl("", Validators.required),
    Askquestion: new FormControl("", Validators.required),
    Correctanswer: new FormControl("", Validators.required),
    wronganswer1: new FormControl("", Validators.required),
    wronganswer2: new FormControl("", Validators.required),
  });
  constructor(private service: AppService, private router: Router) {
    this.service.GetClassifiedLookUpsByCategory("Gender").subscribe((result: any) => {
      this.Gender = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Nationality").subscribe((result: any) => {
      this.Nationality = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("Language").subscribe((result: any) => {
      this.Language = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("CareerLevel").subscribe((result: any) => {
      this.CareerLevel = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("EmploymentType").subscribe((result: any) => {
      this.EmploymentType = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("WorkExperience").subscribe((result: any) => {
      this.WorkExperience = result.data;
    })
    this.service.GetClassifiedLookUpsByCategory("MonthlySalary ").subscribe((result: any) => {
      this.MonthlySalary = result.data;

    })
    this.service.GetClassifiedLookUpsByCategory("JobBenefits ").subscribe((result: any) => {
      this.JobBenefits = result.data;

    })
    this.service.GetClassifiedLookUpsByCategory("CompanySize ").subscribe((result: any) => {
      this.CompanySize = result.data;

    })
    this.service.GetClassifiedLookUpsByCategory("CompanyListedBy ").subscribe((result: any) => {
      this.CompanyListedBy = result.data;

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
  onSubmit() {
    if (this.DetailsForm.value.title == "") {
      this.currentField = "title-input";
      this.error = "Enter Title Number";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Description == "") {
      this.currentField = "description-input";
      this.error = "Enter Description";
      this.showError = true;
      return;
    } else if ($(".Gender").val() == 0) {
      this.currentField = "Gender + .select2";
      this.error = "Enter Gender";
      this.showError = true;
      return;
    } else if ($(".Nationality").val() == 0) {
      this.currentField = "Nationality + .select2";
      this.error = "Enter Nationality";
      this.showError = true;
      return;
    } else if ($(".Language").val() == 0) {
      this.currentField = "Language + .select2";
      this.error = "Enter Language";
      this.showError = true;
      return;
    } else if ($(".Career-level").val() == 0) {
      this.currentField = "Career-level + .select2";
      this.error = "Enter Career Level";
      this.showError = true;
      return;
    } else if ($(".Employment-type").val() == 0) {
      this.currentField = "Employment-type + .select2";
      this.error = "Enter Employment Type";
      this.showError = true;
      return;
    } else if ($(".Remote-job").val() == 0) {
      this.currentField = "Remote-job + .select2";
      this.error = "Enter Remote Job";
      this.showError = true;
      return;
    } else if ($(".Work-experience").val() == 0) {
      this.currentField = "Work-experience + .select2";
      this.error = "Enter Min Work Experience";
      this.showError = true;
      return;
    } else if ($(".Education-level").val() == 0) {
      this.currentField = "Education-level + .select2";
      this.error = "Enter Min Education Level";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Skill1 == "") {
      this.currentField = "skill1-input";
      this.error = "Enter Skill";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Skill2 == "") {
      this.currentField = "skill2-input";
      this.error = "Enter Skill";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Skill3 == "") {
      this.currentField = "skill3-input";
      this.error = "Enter Skill";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Skill4 == "") {
      this.currentField = "skill4-input";
      this.error = "Enter Skill";
      this.showError = true;
      return;
    } else if ($(".CV-required").val() == 0) {
      this.currentField = "CV-required + .select2";
      this.error = "Select CV Requirement";
      this.showError = true;
      return;
    } else if ($(".Monthly-salary").val() == 0) {
      this.currentField = "Monthly-salary + .select2";
      this.error = "Enter Monthly Salary";
      this.showError = true;
      return;
    } else if ($(".Benifits").val() == 0) {
      this.currentField = "Benifits + .select2";
      this.error = "Enter Benifits";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Companyname == "") {
      this.currentField = "company-name-input";
      this.error = "Enter Company Name";
      this.showError = true;
      return;
    } else if ($(".Want-to_Show-Name").val() == 0) {
      this.currentField = "Want-to_Show-Name + .select2";
      this.error = "Do you want to Show Company Name";
      this.showError = true;
      return;
    } else if ($(".Comapny-size").val() == 0) {
      this.currentField = "Comapny-size + .select2";
      this.error = "Enter Comapny Size";
      this.showError = true;
      return;
    } else if ($(".Listed-by").val() == 0) {
      this.currentField = "Listed-by+ .select2";
      this.error = "Select Listed by";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Askquestion == "") {
      this.currentField = "Askquestion-input";
      this.error = "Enter Question";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Correctanswer == "") {
      this.currentField = "Correctanswer-input";
      this.error = "Enter Answer";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.wronganswer1 == "") {
      this.currentField = " wronganswer1-input";
      this.error = "Enter Answer";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.wronganswer2 == "") {
      this.currentField = "wronganswer2-input";
      this.error = "Enter Answer";
      this.showError = true;
      return;
    }

  }
}

