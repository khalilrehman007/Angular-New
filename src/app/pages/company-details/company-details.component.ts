import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

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
  companyDetails: any;
  id: any;
  totalLength: number = 0;
  page: number = 1;
  constructor(private service:AppService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service.id = params['id'];
    }) 
    this.service.DisplayCompany(this.id).subscribe((result:any)=>{
      this.companyDetails = result.data;
      console.log(this.companyDetails)

    })

  }

  pageChanged(value: any) {
    this.page = value;
  }

  featuredAgentData:any = {
    heading:"Featured Real Estate Companies",
    desc:"Some of our best property agents",
    list:[
      {
        tag:"assets/images/tag/featured.png",
        img:"/assets/images/agent-image.png",
        company:"assets/images/brand/betterhomes.png",
        heading:"Olga Pikina",
        text:"Sales Director / 10 Yrs. Exp",
        link:{
          text:"+971 50 456 3423",
          url:""
        },
        location:"Dubai, UAE",
        nationality:"Nationality: Australia",
        language:"Language: English, Hindi, Arabic, Urdu, Danish",
        details:[
          {
            count:"247",
            name:"Sale"
          },
          {
            count:"247",
            name:"Rents"
          },
          {
            count:"247",
            name:"Commercial"
          },
        ]
      },
      {
        tag:"assets/images/tag/featured.png",
        img:"/assets/images/agent-image.png",
        company:"assets/images/brand/betterhomes.png",
        heading:"Olga Pikina",
        text:"Sales Director / 10 Yrs. Exp",
        link:{
          text:"+971 50 456 3423",
          url:""
        },
        location:"Dubai, UAE",
        nationality:"Nationality: Australia",
        language:"Language: English, Hindi, Arabic, Urdu, Danish",
        details:[
          {
            count:"247",
            name:"Sale"
          },
          {
            count:"247",
            name:"Rents"
          },
          {
            count:"247",
            name:"Commercial"
          },
        ]
      },
      {
        tag:"assets/images/tag/featured.png",
        img:"/assets/images/agent-image.png",
        company:"assets/images/brand/betterhomes.png",
        heading:"Olga Pikina",
        text:"Sales Director / 10 Yrs. Exp",
        link:{
          text:"+971 50 456 3423",
          url:""
        },
        location:"Dubai, UAE",
        nationality:"Nationality: Australia",
        language:"Language: English, Hindi, Arabic, Urdu, Danish",
        details:[
          {
            count:"247",
            name:"Sale"
          },
          {
            count:"247",
            name:"Rents"
          },
          {
            count:"247",
            name:"Commercial"
          },
        ]
      },
      {
        tag:"assets/images/tag/featured.png",
        img:"/assets/images/agent-image.png",
        company:"assets/images/brand/betterhomes.png",
        heading:"Olga Pikina",
        text:"Sales Director / 10 Yrs. Exp",
        link:{
          text:"+971 50 456 3423",
          url:""
        },
        location:"Dubai, UAE",
        nationality:"Nationality: Australia",
        language:"Language: English, Hindi, Arabic, Urdu, Danish",
        details:[
          {
            count:"247",
            name:"Sale"
          },
          {
            count:"247",
            name:"Rents"
          },
          {
            count:"247",
            name:"Commercial"
          },
        ]
      },
      {
        tag:"assets/images/tag/featured.png",
        img:"/assets/images/agent-image.png",
        company:"assets/images/brand/betterhomes.png",
        heading:"Olga Pikina",
        text:"Sales Director / 10 Yrs. Exp",
        link:{
          text:"+971 50 456 3423",
          url:""
        },
        location:"Dubai, UAE",
        nationality:"Nationality: Australia",
        language:"Language: English, Hindi, Arabic, Urdu, Danish",
        details:[
          {
            count:"247",
            name:"Sale"
          },
          {
            count:"247",
            name:"Rents"
          },
          {
            count:"247",
            name:"Commercial"
          },
        ]
      },
      {
        tag:"assets/images/tag/featured.png",
        img:"/assets/images/agent-image.png",
        company:"assets/images/brand/betterhomes.png",
        heading:"Olga Pikina",
        text:"Sales Director / 10 Yrs. Exp",
        link:{
          text:"+971 50 456 3423",
          url:""
        },
        location:"Dubai, UAE",
        nationality:"Nationality: Australia",
        language:"Language: English, Hindi, Arabic, Urdu, Danish",
        details:[
          {
            count:"247",
            name:"Sale"
          },
          {
            count:"247",
            name:"Rents"
          },
          {
            count:"247",
            name:"Commercial"
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

}
