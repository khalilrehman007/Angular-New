import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  showLoader: boolean = false;
  classifiedData: any = localStorage.getItem("classifiedData");
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
  jobTitle: any = [];
  Gender: any = [];
  Nationality: any = [];
  Language: any = [];
  CareerLevel: any = [];
  EmploymentType: any = [];
  WorkExperience: any = [];
  JobSkills: any = [];
  MonthlySalary: any = [];
  JobBenefits: any = [];
  CompanySize: any = [];
  CompanyListedBy: any = [];
  DetailsForm = new FormGroup({
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
    this.classifiedData = JSON.parse(this.classifiedData);
    this.service.GetClassifiedLookUpsByCategory("JobTitle").subscribe((result: any) => {
      this.jobTitle = result.data;
    })
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
    this.service.GetClassifiedLookUpsByCategory("JobSkills").subscribe((result: any) => {
      this.JobSkills = result.data;
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
    let extrasLength:any = $(".Language").val();
    if ($(".job-title").val() == 0) {
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
    } else if ($(".Remote-job").val() == -1) {
      this.currentField = "Remote-job + .select2";
      this.error = "Enter Remote Job";
      this.showError = true;
      return;
    } else if ($(".Work-experience").val() == 0) {
      this.currentField = "Work-experience + .select2";
      this.error = "Enter Min Work Experience";
      this.showError = true;
      return;
    } else if ($(".skill1-input").val() == 0) {
      this.currentField = "skill1-input";
      this.error = "Enter Skill";
      this.showError = true;
      return;
    } else if ($(".skill2-input").val() == 0) {
      this.currentField = "skill2-input";
      this.error = "Enter Skill";
      this.showError = true;
      return;
    } else if (this.DetailsForm.value.Companyname == "") {
      this.currentField = "company-name-input";
      this.error = "Enter Company Name";
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
    }
    let tempData: any = {};
    tempData.CountryId = this.classifiedData.countryId;
    tempData.CityId = this.classifiedData.cityId;
    tempData.DistrictId = this.classifiedData.districtId;
    tempData.Latitude = this.classifiedData.Latitude;
    tempData.Longitude = this.classifiedData.Longitude;
    tempData.ClassifiedCategoryId = this.classifiedData.classifiedData[this.classifiedData.classifiedData.length - 1].value;
    tempData.JobTitleId = $(".job-title").val();
    tempData.Description = this.DetailsForm.value.Description;
    tempData.GenderId = $(".Gender").val();
    tempData.NationalityId = $(".Nationality").val();
    tempData.CareerLevelId = $(".Career-level").val();
    tempData.EmploymentTypeId = $(".Employment-type").val();
    tempData.IsRemoteJob = $(".Remote-job").val();
    tempData.WorkExperienceId = $(".Work-experience").val();
    tempData.FirstSkillId = $(".skill1-input").val();
    tempData.SecondSkillId = $(".skill2-input").val();
    tempData.SecondSkillId = $(".skill2-input").val();
    tempData.CompanyName = this.DetailsForm.value.Companyname;
    tempData.CompanySizeId = $(".Comapny-size").val();
    tempData.CompanyListedById = $(".Listed-by").val();
    let temp = [];
    for(let item of extrasLength) {
      temp.push({"ClassifiedFeatureLookUpId": item});
    }
    tempData.ClassifiedLanguages = temp;

    let userData:any = localStorage.getItem("user");
    userData = JSON.parse(userData)
    tempData.UserId = userData.id;
    console.log(tempData);
    localStorage.setItem("classifiedFormData",JSON.stringify(tempData));
    let formData = new FormData();
    formData.append("ClassifiedRequest",JSON.stringify(tempData));
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    this.showLoader = true;
    $.ajax({
      url: `${environment.apiUrl}api/AddUpdateClassified`,
      method: "post",
      contentType: false,
      processData: false,
      data: formData,
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        console.log(res);
        if (res.result == 1) {
          this.showLoader = false;
          tempData.id = res.data.id;
          localStorage.setItem("classifiedFormData", JSON.stringify(tempData));
          if(this.classifiedData.classifiedData[0].value == 1) {
            this.router.navigate(["/classified/classified-payment"]);
          } else {
            this.router.navigate(["/classified/classified-payment-second"]);
          }
        }
        else {
          this.showLoader = false;
          this.error = res.error;
          this.showError = true;
        }
      },
      error: (err) => {
        this.showLoader = false;
      }
    });
  }
}

