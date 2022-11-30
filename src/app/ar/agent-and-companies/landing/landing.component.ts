import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from 'src/app/service/app.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { data } from 'jquery';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  baseUrl = environment.apiUrl;
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
  searchfilter: any;
  SearchKeyword: string[] = [];
  searchList: any = [];
  agentObject: any = { "CountryId": "1", "DistrictsId": [], "CompaniesId": [], "UserId": "0", "EpertInId": "0", "LanguageId": "0", "CurrentPage": 1 };
  allCountries: any;
  country: any = [];
  languageIds: any;
  ExpertInId: any;
  getAgentId: any;
  locationId: any = [];
  countryData: any = "";

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService, private router: Router, private service: AppService, private cookie: CookieService) {
    if (this.router.url == "/find-companies") {
      this.companies = true;
    }
    $(window).scrollTop(0);
    this.agentData();
    this.companyData();

    this.languageIds = this.activeRoute.snapshot.queryParamMap.get('LanguageId');
    this.ExpertInId = this.activeRoute.snapshot.queryParamMap.get('ExpertInId');
    this.locationId = this.activeRoute.snapshot.queryParamMap.get('locationId');
    this.getAgentId = this.activeRoute.snapshot.queryParamMap.get('getAgentId');

    this.locationId = JSON.parse(this.locationId);


    if (this.ExpertInId == null) {
      this.ExpertInId = 0
    }
    if (this.languageIds == null) {
      this.languageIds = 0
    }

    let url = this.router.url.replace("/", "");
    url = this.router.url.split('?')[0];

    if (url == '/find-companies') {
      this.companiesCheck = true;
      this.companies = true;
      this.companyData();
    } else if (url == '/find-agent') {
      this.agentCheck = true;
      this.agentData();
    }
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
  ngAfterViewInit(): void {
    let a = setInterval(() => {
      if (this.cookie.get("countryData")) {
        this.countryData = JSON.parse(this.cookie.get("countryData"));
        this.getCompany({ "Searching": '', "CountryId": this.countryData.id });
        let agentObject: any = {
          "CountryId": this.countryData.id, "DistrictsId": this.locationId,
          "CompaniesId": [], "UserId": "0", "EpertInId": this.ExpertInId,
          "LanguageId": this.languageIds, "CurrentPage": 1
        };
        this.agentListData(agentObject);
        this.companiesListData({ "CountryId": this.countryData.id, "DistrictsId": [], "CompaniesId": [], "CurrentPage": 1 });
        this.service.BestAgent(this.countryData.id).subscribe((result: any) => {
          let tempData: Array<Object> = []
          let response: any = result.data;
          response.forEach((element: any, i: any) => {
            let imageUrl: any = '../assets/images/user.png';
            if (element.agentDetails != undefined && element.agentDetails.user.imageUrl != undefined) {
              imageUrl = this.baseUrl + element.agentDetails.user.imageUrl
            }
            let fullName: any = '';
            if (element.agentDetails != undefined && element.agentDetails.user.fullName != undefined) {
              fullName = element.agentDetails.user.fullName
            }
            let id: any = '';
            if (element.agentDetails != undefined && element.agentDetails.user.id != undefined) {
              id = element.agentDetails.user.id
            }
            let expertIn: any = '';
            if (element.agentDetails != undefined && element.agentDetails.expertIn != undefined) {
              expertIn = element.agentDetails.expertIn
            }
            let reraNo: any = '';
            if (element.agentDetails != undefined && element.agentDetails.company != undefined && element.agentDetails.company.reraNo != undefined) {
              reraNo = element.agentDetails.company.reraNo
            }
            let premitNo: any = '';
            if (element.agentDetails != undefined && element.agentDetails.company != undefined && element.agentDetails.company.premitNo != undefined) {
              premitNo = element.agentDetails.company.premitNo
            }
            tempData.push(
              {
                id: id,
                imageUrl: imageUrl,
                fullName: fullName,
                expertIn: expertIn,
                reraNo: reraNo,
                premitNo: premitNo,
                salePropertyListingCount: element.salePropertyListingCount,
                rentPropertyListingCount: element.rentPropertyListingCount,
                commercialPropertyListingCount: element.commercialPropertyListingCount,

              }
            );
          })
          this.agentDetails = tempData
        })
        this.service.BestCompanies(this.countryData.id).subscribe((result: any) => {
          this.bestCompanies = result.data;
        })
        clearInterval(a);
      }
    }, 100);
  }
  companyOnSearchData: any = []
  getCompany(data: any) {
    let tempData: any = []
    let tempCompleteData: any = []
    this.service.CompanyLocationAutoCompleteSearch(data).subscribe(data => {
      let response: any = data;
      response.data.locationAutoComplete.forEach((element:any, i:any) => {
        tempData.push(element.item2);
        tempCompleteData.push({ 'id': element.key, 'value': element.item2 })
      })
      response.data.companyAutoComplete.forEach((element:any, i:any) => {
        tempData.push(element.value);
        tempCompleteData.push({ 'id': element.key, 'value': element.value })
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
      heading: "وكلاء العقارات الالأكثر شعبيةون",
      desc: "بعض من أفضل الوسطاء العقارات لدينا",
    };
    this.agentList = {
      heading: "إدراج وسيط عقاري",
      desc: "بعض من أفضل الوسطاء العقارات لدينا",
      tableHeadings: [
        "الوكلاء",
        "موقعك",
        "التخصصات",
        "عمل"
      ],
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
      this.companiesListData({ "CountryId": this.countryData.id, "DistrictsId": [], "CompaniesId": [], "CurrentPage": 1 });
    }
  }
  companyData() {
    this.page = 1;
    this.featuredCompaniesData = {
      heading: "الشركات العقارية الالأكثر شعبيةة",
      desc: "بعض من أفضل الوسطاء العقارات لدينا",
    };
    this.companiesList = {
      heading: "قائمة الشركات العقارية",
      desc: "بعض من أفضل الوسطاء العقارات لدينا",
      tableHeadings: [
        "الشركات",
        "التخصصات",
        "الوكلاء",
        "عمل"
      ],
    };

  }
  agentpageChanged(value: any) {
    this.page = value;
  }
  companypageChanged(value: any) {
    this.companypage = value;
  }
  filterCountry(id: any) {
    let temp = this.country.filter((c: any) => c.id == id)[0];
    let name: any = '';
    if (temp != undefined && temp.name != undefined) {
      name = temp.name
    }
    return name;
  }

  ngOnInit(): void {
  }

  @ViewChild('SearchInput') SearchInput:any;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.SearchKeyword.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.searchctrl.setValue(null);
  }


  removeCompanyIds: any = []
  remove(searchCompenies: string): void {
    let removeId: any;
    this.companyOnSearchData.forEach((element:any, i:any) => {
      if (element.value == searchCompenies) {
        removeId = element.id
      }
    })

    let companyIndex: number = this.companyIds.indexOf(removeId);
    if (companyIndex !== -1) {
      this.companyIds.splice(companyIndex, 1);
    }

    const index = this.SearchKeyword.indexOf(searchCompenies);

    if (index >= 0) {
      this.SearchKeyword.splice(index, 1);
    }
  }

  companyIds: any = []
  selected(event: MatAutocompleteSelectedEvent): void {
    this.companyOnSearchData.forEach((element:any, i:any) => {
      if (element.value == event.option.viewValue) {
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
      let response: any = result.data
      response.agents.forEach((element:any, i:any) => {
        let imageUrl: any = '../assets/images/user.png';
        if (element.user != undefined && element.user.imageUrl != undefined) {
          imageUrl = this.baseUrl + element.user.imageUrl
        }
        let id: any = '';
        if (element.user != undefined && element.user.id != undefined) {
          id = element.user.id
        }
        let fullName: any = '';
        if (element.user != undefined && element.user.fullName != undefined) {
          fullName = element.user.fullName
        }
        let companyName: any = '';
        if (element.company != undefined && element.company.companyName != undefined) {
          companyName = element.company.companyName
        }
        let phoneNumber: any = '';
        if (element.user != undefined && element.user.phoneNumber != undefined) {
          phoneNumber = element.user.phoneNumber
        }
        let countryId: any = '';
        if (element.user != undefined && element.user.countryId != undefined) {
          countryId = element.user.countryId
        }

        let agentLanguages: any = [];
        if (element.agentLanguages != undefined && element.agentLanguages != null) {
          agentLanguages = element.agentLanguages
        }
        let expertIn: any = element.expertIn

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
    return this.searchList.filter((searchCompenies:any) => searchCompenies.toLowerCase().includes(filterValue));
  }
  childParentDataLoad(data: any) {
    this.agentListData(data);
  }
  proceedCompanySearch() {
    let params: any = { "CountryId": this.countryData.id, "DistrictsId": [], "CompaniesId": this.companyIds, "CurrentPage": 1 }
    this.router.navigate(['/find-agent'], { queryParams: params })
    this.companiesListData(params);

  }
}