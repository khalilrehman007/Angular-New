import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  userData:any = "";
  professionalTypes:any = "";
  userType:any = "user";
  constructor(private service: AppService) {
    this.userData = localStorage.getItem("signupData");
    this.userData = JSON.parse(this.userData);
    if(this.userData.HasProfessionalType) {
      this.service.ProfessionalTypes().subscribe((result: any) => {
        this.professionalTypes = result.data;
        for(let item of this.professionalTypes) {
          if(this.userData.ProfessionalTypeId == item.id)
          this.userType = item.name;
        }
        console.log(this.userType)
      })
    }
  }
  ngOnInit(): void {
  }

}
