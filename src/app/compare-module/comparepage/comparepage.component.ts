import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comparepage',
  templateUrl: './comparepage.component.html',
  styleUrls: ['./comparepage.component.scss']
})
export class ComparepageComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
  viewPropertyOne: any = "";
  viewPropertyTwo: any = "";
  viewPropertyThree: any = "";
  error: any = "";
  showError: boolean = false;
  errorResponse(data: any) {
    this.showError = false;
  }
  popularLisitng: any = [];
  userData: any = [];
  countryData: any = "";
  featurePorperty1: any = [];
  featurePorperty2: any = [];
  featurePorperty3: any = [];
  featurePorperty4: any = [];
  count: number = 0;

  constructor(private route: Router, private authService: AuthService, private service: AppService, private cookie: CookieService) {
    
    $(window).scrollTop(0); 
    if (localStorage.getItem("clickProprtyOne")){
      this.count++
      this.viewPropertyOne = localStorage.getItem("clickProprtyOne");
      this.viewPropertyOne = JSON.parse(this.viewPropertyOne);
    }
    
    if (localStorage.getItem("clickProprtyTwo")){
      this.count++
      this.viewPropertyTwo = localStorage.getItem("clickProprtyTwo");
      this.viewPropertyTwo = JSON.parse(this.viewPropertyTwo);
    }
    
    if (localStorage.getItem("clickProprtyThree")){
      this.count++
      this.viewPropertyThree = localStorage.getItem("clickProprtyThree");
      this.viewPropertyThree = JSON.parse(this.viewPropertyThree);
    }

    if (localStorage.getItem("user")){
      this.userData = localStorage.getItem("user");
      this.userData = JSON.parse(this.userData);
      this.countryData = JSON.parse(this.cookie.get("countryData"));
    }
    if (!localStorage.getItem("user")){
      this.route.navigate(['/login'])
    }
    this.service.GetPopularListingsComparison(this.countryData.id).subscribe((result:any)=>{
      if (result.data.appartments != null){
        this.popularLisitng.push(result.data.appartments)
      }
      if (result.data.office != null){
        this.popularLisitng.push(result.data.office)
      }
      if (result.data.penthouse != null){
        this.popularLisitng.push(result.data.penthouse)
      }
      if (result.data.townhouse != null){
        this.popularLisitng.push(result.data.townhouse)
      }
      if (result.data.villas != null){
        this.popularLisitng.push(result.data.villas)
      }
    })

    this.service.LatestPropertiesListingResidential({ "CountryId": this.countryData.id, "UserId": this.userData.id, "propertyListingTypeId": "1" }).subscribe((response: any) => {
      this.featurePorperty1 = response.data;
       console.log("feature",this.featurePorperty1)
    });
    this.service.LatestPropertiesListingResidential({ "CountryId": this.countryData.id, "UserId": this.userData.id, "propertyListingTypeId": "2" }).subscribe((response: any) => {
      this.featurePorperty2 = response.data;
    });
    this.service.LatestPropertiesListingCommercial({ "CountryId": this.countryData.id, "UserId": this.userData.id, "propertyListingTypeId": "1" }).subscribe((response: any) => {
      this.featurePorperty3 = response.data;
    });
    this.service.LatestPropertiesListingCommercial({ "CountryId": this.countryData.id, "UserId": this.userData.id, "propertyListingTypeId": "2" }).subscribe((response: any) => {
      this.featurePorperty4 = response.data;
    });
  }

  checkProperty(){
    if (this.count < 2){
      this.error = "Select atleast 2 properties";
      this.showError = true;
      return;
    } else {
      this.route.navigate(['/compare/view'])
      return;
    }
  }

  ngOnInit(): void {
  }
  popularComparisonOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      }
    },
    nav: true
  }
  featuredOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  selectProperty(compare:any){
    localStorage.setItem("compareIndex", compare)
    if(this.viewPropertyOne == "") {
      this.route.navigate(['/compare/selection'])
    } else if(this.viewPropertyOne.rentType == "") {
      this.route.navigate(['/compare/selection'], { queryParams: {type:"Buy",PropertyListingTypeId:2} })
    } else if (this.viewPropertyOne.rentType == "Short Term ") {
      this.route.navigate(['/compare/selection'], { queryParams: {RentTypeId:1} })
    } else {
      this.route.navigate(['/compare/selection'], { queryParams: {type:"Rent",PropertyListingTypeId:1} })
    }
  }
  removeProperty(){
    localStorage.removeItem("clickProprtyOne")
    this.viewPropertyOne = "";
    this.count--;
  }
  removePropertyTwo(){
    localStorage.removeItem("clickProprtyTwo")
    this.viewPropertyTwo = "";
    this.count--;
  }
  removePropertyThree(){
    localStorage.removeItem("clickProprtyThree")
    this.viewPropertyThree = "";
    this.count--;
  }
  PopularComparisonList = [
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
    {
      src1: '/assets/images/property/1.png',
      src2: '/assets/images/property/3.png',
      price1: '58,657',
      price2: '68,657',
      PropertyName1: 'Sultan Building',
      PropertyName2: 'Sultan New Building',
      link: '/compare/view',
      address1: 'Etihad Tower 4, Etihad Towers,',
      address2: 'Etihad Tower 4, Etihad Towers,',
    },
  ]
  trash = '/assets/images/icons/Trash-dotted.svg'
  swimm = '/assets/images/icons/swimming.svg'
  Featuredproperties = [
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'},
    {img: '/assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi',city: 'Dubai',carpetArea: '1200',bedrooms: '2',bathrooms: '1',parkings: 'No',propertyAge:'10 yeras',floorNo: '10',totalFloor: '25',towerBlock: 'yes',unitNo: '123',furnishingType:'Furnished'}
  ];
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  compareProperty(e:any) {
    let temp:any = [];
    temp.push(e[0]);
    temp.push(e[1]);
    temp.push(e[2]);
    localStorage.setItem("compareProperty", JSON.stringify(temp));
    this.route.navigate(['/compare/view'])
  }
}
