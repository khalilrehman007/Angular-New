import { Component, OnInit } from '@angular/core';
import { Select2 } from 'select2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {
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
  DetailsForm = new FormGroup({
    Title : new FormControl("", Validators.required),
    Phone : new FormControl("", Validators.required),
    Description : new FormControl("", Validators.required),
  });
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    $('.select2').select2({ placeholder: "Search..." });
    }
    onSubmit() {
     if(this.DetailsForm.value.Title == "") {
      this.currentField = "title-input";
      this.error = "Enter Title";
      this.showError = true;
      return;
    }  else if(this.DetailsForm.value.Phone == "") {
      this.currentField = "phone-input";
      this.error = "Enter Phone Number";
      this.showError = true;
      return;
    } if($(".Show-Phone-Numer").val() == 0) {
      this.currentField = "Show-Phone-Numer + .select2";
      this.error = "Do you want to Show Phone Number";
      this.showError = true;
      return;
    } else if(this.DetailsForm.value.Description == "") {
      this.currentField = "description-input";
      this.error = "Enter Description";
      this.showError = true;
      return;
    }
  }  
}

