import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-landing',
  templateUrl: './agent-landing.component.html',
  styleUrls: ['./agent-landing.component.scss']
})
export class AgentLandingComponent implements OnInit {

  companies:boolean = false;
  constructor() {
    this.agentData();
  }
  featuredAgentData:any;
  agentList:any;
  featuredCompaniesData:any;
  companiesList:any;
  agentData() {
    this.companies = false;
    this.featuredAgentData = {
      heading:"Featured Real Estate Companies",
      desc:"Some of our best property agents",
      list:[
        {
          tag:"assets/images/tag/featured.png",
          img:"/assets/images/agent-image.png",
          company:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          rera:"RERA# 11899",
          permit:"Permit# 7187842740",
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
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          rera:"RERA# 11899",
          permit:"Permit# 7187842740",
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
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          rera:"RERA# 11899",
          permit:"Permit# 7187842740",
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
    this.agentList = {
      heading:"Real Estate Companies Listing",
      desc:"Some of our best property agents",
      tableHeadings:[
        "Companies",
        "Location",
        "Specialities",
        "Action"
      ],
      tableData:[
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/testimonial/user.png",
          heading:"Better Homes Properties",
          name:"Olga Pikina",
          position:"Sales Director",
          link:{
            text:"+971 50 456 3423",
            url:""
          },
          location:"Dubai, UAE",
          language:"Language: English, Hindi, Arabic, Urdu, Danish",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
      ]
    };
  }
  companyData() {
    this.companies = true;
    this.featuredCompaniesData = {
      heading:"Featured Real Estate Companies",
      desc:"Some of our best property agents",
      list:[
        {
          tag:"assets/images/tag/featured.png",
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          rera:"RERA# 11899",
          permit:"Permit# 7187842740",
          details:[
            {
              count:"345",
              name:"Agents"
            },
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
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          rera:"RERA# 11899",
          permit:"Permit# 7187842740",
          details:[
            {
              count:"345",
              name:"Agents"
            },
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
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          rera:"RERA# 11899",
          permit:"Permit# 7187842740",
          details:[
            {
              count:"345",
              name:"Agents"
            },
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
    this.companiesList = {
      heading:"Real Estate Companies Listing",
      desc:"Some of our best property agents",
      tableHeadings:[
        "Companies",
        "Specialities",
        "Agents",
        "Action"
      ],
      tableData:[
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
        {
          img:"assets/images/brand/betterhomes.png",
          heading:"Better Homes Properties",
          text:"P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link:{
            text:"View Map",
            url:""
          },
          permit:"RERA# 11899 | Permit# 7187842740",
          specialities:[
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents:"345",
          btn:{
            img:"assets/images/icons/eye.svg",
            text:"View Detail"
          }
        },
      ]
    };

  }
  ngOnInit(): void {
  }

}
