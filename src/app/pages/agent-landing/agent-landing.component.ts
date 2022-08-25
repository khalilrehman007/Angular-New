import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from 'src/app/service/app.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { data } from 'jquery';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-agent-landing',
  templateUrl: './agent-landing.component.html',
  styleUrls: ['./agent-landing.component.scss']
})
export class AgentLandingComponent implements OnInit {
  baseUrl = 'https://beta.ovaluate.com/'
  totalLength: number = 0;
  page: number = 1;
  companypage: number = 1;
  companies: boolean = false;
  agentDetails: any;
  bestCompanies: any;
  findAgent: any = [];
  findCompanies: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchctrl = new FormControl('');
  searchfilter: Observable<string[]>;
  SearchKeyword: string[] = [];
  searchList: any = [];
  agentObject: any = { "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "UserId": "0", "EpertInId": "0", "LanguageId": "0", "CurrentPage": 1 };
  allCountries: any;
  country: any = [];
  languageIds: any;
  ExpertInId: any;
  getAgentId: any;
  locationId: any = [];

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService, private router: Router, private service: AppService) {
    this.agentData();
    this.companyData();
    this.getCompany({"Searching":'',"CountryId":"1"});

    this.languageIds = this.activeRoute.snapshot.queryParamMap.get('LanguageId');
    this.ExpertInId = this.activeRoute.snapshot.queryParamMap.get('ExpertInId');
    this.locationId = this.activeRoute.snapshot.queryParamMap.get('locationId');
    this.getAgentId = this.activeRoute.snapshot.queryParamMap.get('getAgentId');

    this.locationId = JSON.parse(this.locationId);

    console.log(this.languageIds,this.ExpertInId,this.locationId,this.getAgentId)

    if (this.ExpertInId == null) {
      this.ExpertInId = 0
    }
    if (this.languageIds == null) {
      this.languageIds = 0
    }

    let url = this.router.url.replace("/", "");
    url = this.router.url.split('?')[0];

    if (url == 'find-companies') {
      this.companiesCheck = true;
      this.companies = true;
      this.companyData();
    } else if (url == '/find-agent') {
      this.agentCheck = true;
      this.agentData();
    }

    let agentObject: any = { "CountryId": "1", "DistrictsId": this.locationId,
      "CompaniesId": [], "UserId": "0", "EpertInId": this.ExpertInId,
      "LanguageId": this.languageIds, "CurrentPage": 1
    };

    this.agentListData(agentObject);

    this.companiesListData({ "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "CurrentPage": 1 });

    this.service.BestAgent(1).subscribe((result: any) => {
      // this.agentDetails = result.data;
      let tempData: Array<Object> = []
      let response :any = result.data;
      response.forEach((element, i) => {
        let imageUrl :any = '../assets/images/user.png';
        if(element.agentDetails !=undefined &&  element.agentDetails.user.imageUrl != undefined){
          imageUrl = this.baseUrl+element.agentDetails.user.imageUrl
        }
        let fullName :any = '';
        if(element.agentDetails !=undefined &&  element.agentDetails.user.fullName != undefined){
          fullName = element.agentDetails.user.fullName
        }
        let id :any = '';
        if(element.agentDetails !=undefined &&  element.agentDetails.user.id != undefined){
          id = element.agentDetails.user.id
        }
        let expertIn :any = '';
        if(element.agentDetails !=undefined &&  element.agentDetails.expertIn != undefined){
          expertIn = element.agentDetails.expertIn
        }
        let reraNo :any = '';
        if(element.agentDetails != undefined && element.agentDetails.company !=undefined &&  element.agentDetails.company.reraNo != undefined){
          reraNo = element.agentDetails.company.reraNo
        }
        let premitNo :any = '';
        if(element.agentDetails != undefined && element.agentDetails.company !=undefined &&  element.agentDetails.company.premitNo != undefined){
          premitNo = element.agentDetails.company.premitNo
        }
        tempData.push(
          {
            id: id,
            imageUrl: imageUrl,
            fullName: fullName,
            expertIn: expertIn,
            reraNo  : reraNo,
            premitNo: premitNo,
            salePropertyListingCount:element.salePropertyListingCount,
            rentPropertyListingCount:element.rentPropertyListingCount,
            commercialPropertyListingCount:element.commercialPropertyListingCount,

          }
        );
      })
      this.agentDetails = tempData
    })


    this.service.BestCompanies(1).subscribe((result: any) => {
      this.bestCompanies = result.data;
    })
    this.searchfilter = this.searchctrl.valueChanges.pipe(
      startWith(null),
      map((searchCompenies: string | null) => (searchCompenies ? this._filter(searchCompenies) : this.searchList.slice())),
    );
    this.service.LoadCountries().subscribe((result: any) => {
      if (result.message == "Country list fetched successfully") {
        for (let country of result.data) {
          this.country.push({ name: country.name, id: country.id });
        }
      }
    });
  }

  companyOnSearchData :any = []
  getCompany(data:any){
    let tempData :any = []
    let tempCompleteData :any = []
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data=>{
      let response: any = data;
      response.data.companyAutoComplete.forEach((element, i) => {
        tempData.push(element.value);
        tempCompleteData.push({'id':element.key,'value':element.value})
      })
    });
    this.searchList = tempData
    this.companyOnSearchData = tempCompleteData
  }

  featuredAgentData: any;
  agentCheck: any = false;
  companiesCheck: any = false;
  agentList: any;
  featuredCompaniesData: any;
  companiesList: any;
  agentData() {
    this.page = 1;
    this.featuredAgentData = {
      heading: "Featured Real Estate Agents",
      desc: "Some of our best property agents",
      // list: [
      //   {
      //     tag: "assets/images/tag/featured.png",
      //     img: "/assets/images/agent-image.png",
      //     company: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     rera: "RERA# 11899",
      //     permit: "Permit# 7187842740",
      //     details: [
      //       {
      //         count: "247",
      //         name: "Sale"
      //       },
      //       {
      //         count: "247",
      //         name: "Rents"
      //       },
      //       {
      //         count: "247",
      //         name: "Commercial"
      //       },
      //     ]
      //   },
      //   {
      //     tag: "assets/images/tag/featured.png",
      //     img: "/assets/images/agent-image.png",
      //     company: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     rera: "RERA# 11899",
      //     permit: "Permit# 7187842740",
      //     details: [
      //       {
      //         count: "247",
      //         name: "Sale"
      //       },
      //       {
      //         count: "247",
      //         name: "Rents"
      //       },
      //       {
      //         count: "247",
      //         name: "Commercial"
      //       },
      //     ]
      //   },
      //   {
      //     tag: "assets/images/tag/featured.png",
      //     img: "/assets/images/agent-image.png",
      //     company: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     rera: "RERA# 11899",
      //     permit: "Permit# 7187842740",
      //     details: [
      //       {
      //         count: "247",
      //         name: "Sale"
      //       },
      //       {
      //         count: "247",
      //         name: "Rents"
      //       },
      //       {
      //         count: "247",
      //         name: "Commercial"
      //       },
      //     ]
      //   },
      // ],
    };
    this.agentList = {
      heading: "Real Estate Agent Listing",
      desc: "Some of our best property agents",
      tableHeadings: [
        "Agents",
        "Location",
        "Specialities",
        "Action"
      ],
      // tableData: [
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/testimonial/user.png",
      //     heading: "Better Homes Properties",
      //     name: "Olga Pikina",
      //     position: "Sales Director",
      //     link: {
      //       text: "+971 50 456 3423",
      //       url: ""
      //     },
      //     location: "Dubai, UAE",
      //     language: "Language: English, Hindi, Arabic, Urdu, Danish",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      // ]
    };
  }
  toggleCompany(e: boolean) {
    if (e) {
      this.companies = false;
      this.totalLength = this.findAgent.length;
      this.agentListData(this.agentObject);
    } else {
      this.companies = true;
      this.totalLength = this.findCompanies.length;
      this.companiesListData({ "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "CurrentPage": 1 });
    }
  }
  companyData() {
    this.page = 1;
    this.featuredCompaniesData = {
      heading: "Featured Real Estate Companies",
      desc: "Some of our best property agents",
      // list: [
      //   {
      //     tag: "assets/images/tag/featured.png",
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     rera: "RERA# 11899",
      //     permit: "Permit# 7187842740",
      //     details: [
      //       {
      //         count: "345",
      //         name: "Agents"
      //       },
      //       {
      //         count: "247",
      //         name: "Sale"
      //       },
      //       {
      //         count: "247",
      //         name: "Rents"
      //       },
      //       {
      //         count: "247",
      //         name: "Commercial"
      //       },
      //     ]
      //   },
      //   {
      //     tag: "assets/images/tag/featured.png",
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     rera: "RERA# 11899",
      //     permit: "Permit# 7187842740",
      //     details: [
      //       {
      //         count: "345",
      //         name: "Agents"
      //       },
      //       {
      //         count: "247",
      //         name: "Sale"
      //       },
      //       {
      //         count: "247",
      //         name: "Rents"
      //       },
      //       {
      //         count: "247",
      //         name: "Commercial"
      //       },
      //     ]
      //   },
      //   {
      //     tag: "assets/images/tag/featured.png",
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     rera: "RERA# 11899",
      //     permit: "Permit# 7187842740",
      //     details: [
      //       {
      //         count: "345",
      //         name: "Agents"
      //       },
      //       {
      //         count: "247",
      //         name: "Sale"
      //       },
      //       {
      //         count: "247",
      //         name: "Rents"
      //       },
      //       {
      //         count: "247",
      //         name: "Commercial"
      //       },
      //     ]
      //   },
      // ],
    };
    this.companiesList = {
      heading: "Real Estate Companies Listing",
      desc: "Some of our best property agents",
      tableHeadings: [
        "Companies",
        "Specialities",
        "Agents",
        "Action"
      ],
      // tableData: [
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      //   {
      //     img: "assets/images/brand/betterhomes.png",
      //     heading: "Better Homes Properties",
      //     text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
      //     link: {
      //       text: "View Map",
      //       url: ""
      //     },
      //     permit: "RERA# 11899 | Permit# 7187842740",
      //     specialities: [
      //       "Residential for sale",
      //       "Residential for sale",
      //       "Commercial for sale",
      //       "Commercial for Rent/Lease",
      //     ],
      //     agents: "345",
      //     btn: {
      //       img: "assets/images/icons/eye.svg",
      //       text: "View Detail"
      //     }
      //   },
      // ]
    };

  }
  agentpageChanged(value: any) {
    this.page = value;
    // this.companiesListData({ "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "CurrentPage": value });
  }
  companypageChanged(value: any) {
    this.companypage = value;
    // this.companiesListData({ "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "CurrentPage": value });
  }
  filterCountry(id: any) {
    let temp = this.country.filter((c: any) => c.id == id)[0];
    let name :any = '';
    if(temp != undefined && temp.name != undefined){
      name = temp.name
    }
    return name;
  }

  ngOnInit(): void {
  }

  @ViewChild('SearchInput') SearchInput: ElementRef<HTMLInputElement>;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.SearchKeyword.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.searchctrl.setValue(null);
  }


  removeCompanyIds :any =[]
  remove(searchCompenies: string): void {
    let removeId :any;
    this.companyOnSearchData.forEach((element, i) => {
      if(element.value == searchCompenies){
        removeId = element.id
      }
    })

    let companyIndex :number = this.companyIds.indexOf(removeId);
    if (companyIndex !== -1) {
      this.companyIds.splice(companyIndex, 1);
    }

    const index = this.SearchKeyword.indexOf(searchCompenies);

    if (index >= 0) {
      this.SearchKeyword.splice(index, 1);
    }
  }

  companyIds :any = []
  selected(event: MatAutocompleteSelectedEvent): void {
    this.companyOnSearchData.forEach((element, i) => {
      if(element.value == event.option.viewValue){
        this.companyIds.push(element.id)
      }
    })
    this.SearchKeyword.push(event.option.viewValue);
    this.SearchInput.nativeElement.value = '';
    this.searchctrl.setValue(null);
  }

  agentListData(data: any) {
    let tempData: Array<Object> = []
    this.service.FindAgents(data).subscribe((result: any) => {
      let response :any = result.data
      response.agents.forEach((element, i) => {
        let imageUrl :any = '../assets/images/user.png';
        if(element.user !=undefined &&  element.user.imageUrl != undefined){
          imageUrl = this.baseUrl+element.user.imageUrl
        }
        let id :any = '';
        if(element.user !=undefined &&  element.user.id != undefined){
          id = element.user.id
        }
        let fullName :any = '';
        if(element.user !=undefined &&  element.user.fullName != undefined){
          fullName = element.user.fullName
        }
        let companyName :any = '';
        if(element.company !=undefined &&  element.company.companyName != undefined){
          companyName = element.company.companyName
        }
        let phoneNumber :any = '';
        if(element.user !=undefined &&  element.user.phoneNumber != undefined){
          phoneNumber = element.user.phoneNumber
        }
        let countryId :any = '';
        if(element.user !=undefined &&  element.user.countryId != undefined){
          countryId = element.user.countryId
        }

        let agentLanguages :any = [];
        if(element.agentLanguages !=undefined &&  element.agentLanguages != null){
          agentLanguages = element.agentLanguages
        }
        let expertIn:any =element.expertIn

        tempData.push(
          {
            id: id,
            imageUrl: imageUrl,
            fullName: fullName,
            expertIn: expertIn,
            companyName: companyName,
            phoneNumber: phoneNumber,
            countryId: countryId,
            agentLanguages: agentLanguages,
          }
        );
      })
      console.log(tempData)
      this.findAgent = tempData;
    })
  }
  companiesListData(data: any) {
    this.service.FindCompanies(data).subscribe((result: any) => {
      this.findCompanies = result.data;
    })
  }
  pageChanged(e: any) {
    if (this.companies) {
      this.companypage = e;
    } else {
      this.page = e;
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchList.filter(searchCompenies => searchCompenies.toLowerCase().includes(filterValue));
  }


  childParentDataLoad(data: any) {
    console.log(data)
    this.agentListData(data);
  }

  proceedCompanySearch(){

    let params :any = { "CountryId": "1", "DistrictsId": [], "CompaniesId": this.companyIds, "CurrentPage": 1 }
    this.router.navigate(['/find-agent'],{queryParams:params})
    this.companiesListData(params);

  }

}
