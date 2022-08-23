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

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService, private router: Router, private service: AppService) {
    this.agentData();
    this.companyData();
    this.languageIds = this.activeRoute.snapshot.queryParamMap.get('LanguageId');
    this.ExpertInId = this.activeRoute.snapshot.queryParamMap.get('ExpertInId');

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

    let agentObject: any = { "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "UserId": "0", "EpertInId": this.ExpertInId, "LanguageId": this.languageIds, "CurrentPage": 1 };

    this.companiesListData({ "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "CurrentPage": 1 });

    this.service.BestAgent(1).subscribe((result: any) => {
      this.agentDetails = result.data;
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
        this.agentListData(agentObject);
      }
    });
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
      heading: "Featured Real Estate Companies",
      desc: "Some of our best property agents",
      list: [
        {
          tag: "assets/images/tag/featured.png",
          img: "/assets/images/agent-image.png",
          company: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          rera: "RERA# 11899",
          permit: "Permit# 7187842740",
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
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          rera: "RERA# 11899",
          permit: "Permit# 7187842740",
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
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          rera: "RERA# 11899",
          permit: "Permit# 7187842740",
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
    this.agentList = {
      heading: "Real Estate Companies Listing",
      desc: "Some of our best property agents",
      tableHeadings: [
        "Companies",
        "Location",
        "Specialities",
        "Action"
      ],
      tableData: [
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/testimonial/user.png",
          heading: "Better Homes Properties",
          name: "Olga Pikina",
          position: "Sales Director",
          link: {
            text: "+971 50 456 3423",
            url: ""
          },
          location: "Dubai, UAE",
          language: "Language: English, Hindi, Arabic, Urdu, Danish",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
      ]
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
      list: [
        {
          tag: "assets/images/tag/featured.png",
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          rera: "RERA# 11899",
          permit: "Permit# 7187842740",
          details: [
            {
              count: "345",
              name: "Agents"
            },
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
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          rera: "RERA# 11899",
          permit: "Permit# 7187842740",
          details: [
            {
              count: "345",
              name: "Agents"
            },
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
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          rera: "RERA# 11899",
          permit: "Permit# 7187842740",
          details: [
            {
              count: "345",
              name: "Agents"
            },
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
    this.companiesList = {
      heading: "Real Estate Companies Listing",
      desc: "Some of our best property agents",
      tableHeadings: [
        "Companies",
        "Specialities",
        "Agents",
        "Action"
      ],
      tableData: [
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
        {
          img: "assets/images/brand/betterhomes.png",
          heading: "Better Homes Properties",
          text: "P.O. Box 14781, Ground Floor, Golf Building No. GB, Al Hamra Village, Ras Al Khaimah",
          link: {
            text: "View Map",
            url: ""
          },
          permit: "RERA# 11899 | Permit# 7187842740",
          specialities: [
            "Residential for sale",
            "Residential for sale",
            "Commercial for sale",
            "Commercial for Rent/Lease",
          ],
          agents: "345",
          btn: {
            img: "assets/images/icons/eye.svg",
            text: "View Detail"
          }
        },
      ]
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
    return temp.name;
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

  remove(searchCompenies: string): void {
    const index = this.SearchKeyword.indexOf(searchCompenies);

    if (index >= 0) {
      this.SearchKeyword.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.SearchKeyword.push(event.option.viewValue);
    this.SearchInput.nativeElement.value = '';
    this.searchctrl.setValue(null);
  }

  agentListData(data: any) {
    this.service.FindAgents(data).subscribe((result: any) => {
      this.findAgent = result.data;
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
}
