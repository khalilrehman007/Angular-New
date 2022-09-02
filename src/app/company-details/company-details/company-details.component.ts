import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { NotificationService } from "../../service/notification.service";


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/icons/Bath-tub.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  furnishing = 'assets/images/icons/furnishing.svg'
  companyDetails: any = {};
  id: any;
  totalLength: number = 0;
  page: number = 1;
  user: any;
  constructor(private service: AppService, private route: ActivatedRoute, private notifyService: NotificationService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service.id = params['id'];
    })
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);

   this.DisplayCompany();
  }

  DisplayCompany(){
    this.service.DisplayCompany({"companyId":"2", "SortedBy":"1" }).subscribe((result: any) => {
      this.companyDetails = result.data;
      console.log(this.companyDetails)
    })
  }

  pageChanged(value: any) {
    this.page = value;
  }

  featuredAgentData: any = {
    heading: "Featured Real Estate Companies",
    desc: "Some of our best property agents",
    list: [
      {
        tag: "assets/images/tag/featured.png",
        img: "/assets/images/agent-image.png",
        company: "assets/images/brand/betterhomes.png",
        heading: "Olga Pikina",
        text: "Sales Director / 10 Yrs. Exp",
        link: {
          text: "+971 50 456 3423",
          url: ""
        },
        location: "Dubai, UAE",
        nationality: "Nationality: Australia",
        language: "Language: English, Hindi, Arabic, Urdu, Danish",
        details: [
          {
            count: "247",
            name: "Sale"
          },
          {
            count: "247",
            name: "Rents"
          },
          {
            count: "247",
            name: "Commercial"
          },
        ]
      },
      {
        tag: "assets/images/tag/featured.png",
        img: "/assets/images/agent-image.png",
        company: "assets/images/brand/betterhomes.png",
        heading: "Olga Pikina",
        text: "Sales Director / 10 Yrs. Exp",
        link: {
          text: "+971 50 456 3423",
          url: ""
        },
        location: "Dubai, UAE",
        nationality: "Nationality: Australia",
        language: "Language: English, Hindi, Arabic, Urdu, Danish",
        details: [
          {
            count: "247",
            name: "Sale"
          },
          {
            count: "247",
            name: "Rents"
          },
          {
            count: "247",
            name: "Commercial"
          },
        ]
      },
      {
        tag: "assets/images/tag/featured.png",
        img: "/assets/images/agent-image.png",
        company: "assets/images/brand/betterhomes.png",
        heading: "Olga Pikina",
        text: "Sales Director / 10 Yrs. Exp",
        link: {
          text: "+971 50 456 3423",
          url: ""
        },
        location: "Dubai, UAE",
        nationality: "Nationality: Australia",
        language: "Language: English, Hindi, Arabic, Urdu, Danish",
        details: [
          {
            count: "247",
            name: "Sale"
          },
          {
            count: "247",
            name: "Rents"
          },
          {
            count: "247",
            name: "Commercial"
          },
        ]
      },
      {
        tag: "assets/images/tag/featured.png",
        img: "/assets/images/agent-image.png",
        company: "assets/images/brand/betterhomes.png",
        heading: "Olga Pikina",
        text: "Sales Director / 10 Yrs. Exp",
        link: {
          text: "+971 50 456 3423",
          url: ""
        },
        location: "Dubai, UAE",
        nationality: "Nationality: Australia",
        language: "Language: English, Hindi, Arabic, Urdu, Danish",
        details: [
          {
            count: "247",
            name: "Sale"
          },
          {
            count: "247",
            name: "Rents"
          },
          {
            count: "247",
            name: "Commercial"
          },
        ]
      },
      {
        tag: "assets/images/tag/featured.png",
        img: "/assets/images/agent-image.png",
        company: "assets/images/brand/betterhomes.png",
        heading: "Olga Pikina",
        text: "Sales Director / 10 Yrs. Exp",
        link: {
          text: "+971 50 456 3423",
          url: ""
        },
        location: "Dubai, UAE",
        nationality: "Nationality: Australia",
        language: "Language: English, Hindi, Arabic, Urdu, Danish",
        details: [
          {
            count: "247",
            name: "Sale"
          },
          {
            count: "247",
            name: "Rents"
          },
          {
            count: "247",
            name: "Commercial"
          },
        ]
      },
      {
        tag: "assets/images/tag/featured.png",
        img: "/assets/images/agent-image.png",
        company: "assets/images/brand/betterhomes.png",
        heading: "Olga Pikina",
        text: "Sales Director / 10 Yrs. Exp",
        link: {
          text: "+971 50 456 3423",
          url: ""
        },
        location: "Dubai, UAE",
        nationality: "Nationality: Australia",
        language: "Language: English, Hindi, Arabic, Urdu, Danish",
        details: [
          {
            count: "247",
            name: "Sale"
          },
          {
            count: "247",
            name: "Rents"
          },
          {
            count: "247",
            name: "Commercial"
          },
        ]
      },
    ],
  };
  agentContact = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    phone: new FormControl("", Validators.required),
    message: new FormControl("", Validators.required),
  })

  get name() {
    return this.agentContact.get("name")
  }
  get email() {
    return this.agentContact.get("email")
  }
  get phone() {
    return this.agentContact.get("phone")
  }
  get message() {
    return this.agentContact.get("message")
  }

  ngOnInit(): void {
  }


  leadData: any = {};
  nameError: any = '';
  emailError: any = '';
  phoneError: any = '';
  messageError: any = '';

  leadProceedStore() {
    if (this.agentContact.invalid) {
      if (this.agentContact.value.name == '') {
        this.nameError = "Name required"
      } else {
        this.nameError = ""
      }
      if (this.agentContact.value.email == '') {
        this.emailError = "Email required"
      } else {
        this.emailError = ""
      }
      if (this.agentContact.value.phone == '') {
        this.phoneError = "Phone required"
      } else {
        this.phoneError = ""
      }
      if (this.agentContact.value.message == '') {
        this.messageError = "Message required"
      } else {
        this.messageError = ""
      }
      return;
    }
    if (this.agentContact.valid) {
      this.leadData.name = this.agentContact.value.name
      this.leadData.email = this.agentContact.value.email
      this.leadData.phone = this.agentContact.value.phone
      this.leadData.message = this.agentContact.value.message
      this.leadData.PropertyListingId = ''
      this.leadData.UserId = ''
      // this.leadData.companyId = this.id
      if (this.user != undefined && this.user != null) {
        this.leadData.LoginUserId = this.user.id
      } else {
        this.leadData.LoginUserId = ''
      }
      this.service.StoreLead(this.leadData).subscribe(result => {
        if (result != null) {
          let responsedata: any = result;
          if (responsedata.message == "User Lead  submitted successfully") {
            if (responsedata.data != undefined && responsedata.error.length < 1) {
              this.agentContact.controls.name.setValue('');
              this.agentContact.controls.email.setValue('');
              this.agentContact.controls.phone.setValue('');
              this.agentContact.controls.message.setValue('');
              this.nameError = ''
              this.emailError = ''
              this.phoneError = ''
              this.messageError = ''
              this.notifyService.showSuccess(responsedata.message, "");
            } else {
              this.notifyService.showError(responsedata.error[0], "");
            }
          }
        } else {
          this.notifyService.showError("Submitted Failed", "");
        }
      });
    }
  }
}
