import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-packages',
  templateUrl: './payment-packages.component.html',
  styleUrls: ['./payment-packages.component.scss']
})
export class PaymentPackagesComponent implements OnInit {
  rightarrow = '../../../../assets/images/icons/right-arrow.svg'
  renttab = '../../../../assets/images/icons/rent-tab.svg'
  selltab = '../../../../assets/images/icons/sell-property-tab.svg'
  renttabactve = '../../../../assets/images/icons/rent-active.svg'
  selltabactive = '../../../../assets/images/icons/sell-tab-active.svg'
  professionalTypes: any = [];
  propertyListingTypes: any = [];
  professionalAndListingType: any = [];
  professionalArray: any = [];
  professionalTypeId: any = '';
  professionalPakageView: any;
  professionalTypeTab: any;
  packagesType: any = [];
  points: any = [];
  packages: any = [];
  selectedPackage: any = "";
  selectedPackageByPoints: any = "";
  error: any = ""
  scroll: boolean = false;
  showError: boolean = false;
  success: any = "";
  showSuccess: boolean = false;
  showLoader: boolean = false;
  successResponse(data: any) {
    this.showSuccess = false;
  }
  errorResponse(data: any) {
    this.showError = false;
    if (this.scroll) {
      let temp: any = $(".packagepoints-wrapper-2").offset()?.top;
      this.scroll = false;
      $(window).scrollTop(temp - 100);
    }
  }

  constructor(private service: AppService, private modalService: NgbModal, private router: Router) {
    $(window).scrollTop(0);
    this.loadProfessionalTypes();
    this.loadPropertyListingTypes();
    this.professionalTypeTab = localStorage.getItem('user');
    this.professionalTypeTab = JSON.parse(this.professionalTypeTab);
    this.service.MyWallet(this.professionalTypeTab.id).subscribe((result: any) => {
      this.packages = result.data;
    })
    this.service.PropertyListingPackages(1).subscribe((result: any) => {
      this.packagesType = result.data;
      // this.packagesType.push(result.data[0]);
      // this.packagesType.push(result.data[1]);
      // this.packagesType.push(result.data[2]);
      // this.packagesType.push(result.data[3]);
    })
    this.service.GetPoints(1).subscribe((result: any) => {
      this.points = result.data;
    })


  }

  ngOnInit(): void {
  }

  loadProfessionalTypes() {
    this.service.LoadProfessionalTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Professional type List fetched successfully") {
        for (let professionalTypes of temp.data) {
          this.professionalTypes.push({ name: professionalTypes.name, id: professionalTypes.id, nameAr: professionalTypes.nameAr });
        }
      }
    });
  }
  loadPropertyListingTypes() {
    this.service.LoadPropertyListingTypes().subscribe(e => {
      let temp: any = e;
      if (temp.message == "Property Listing Type List fetched successfully") {
        for (let PropertyListingTypes of temp.data) {
          this.propertyListingTypes.push({ name: PropertyListingTypes.name, id: PropertyListingTypes.id, nameAr: PropertyListingTypes.nameAr });
        }
      }
    });
  }
  getPackage(e: any) {
    this.selectedPackage = e;
  }
  getPackageByPoints(e: any) {
    this.selectedPackageByPoints = e;
  }
  proceedPackagePayment() {
    if (this.selectedPackageByPoints == "") {
      this.error = "الرجاء تحديد نوع الحزمة";
      this.showError = true;
      return;
    } else if (this.packages < this.selectedPackageByPoints.price) {
      this.error = "رصيد حسابك غير كاف ، يرجى إعادة الشحن";
      this.showError = true;
      this.scroll = true;
      return;
    } else {
      localStorage.setItem("seletedPackage", JSON.stringify(this.selectedPackageByPoints));
      this.router.navigate(["/ar/add-property/listingproperty"]);
      
      // this.showLoader = true;
      // let temp: any = localStorage.getItem("user");
      // temp = JSON.parse(temp);
      // this.service.PurchasePackage({ "UserId": temp.id, "PackageId": this.selectedPackageByPoints.id }).subscribe((result: any) => {
      //   if (result.message == "Package has been purchased") {
      //     this.showLoader = false;
      //     this.success = "Your package has been purchsed successfully";
      //     this.showSuccess = true;
      //   } else {
      //     this.error = "Something went wrong please try again";
      //     this.showError = true;
      //   }
      // })
    }
  }
  proceedPayment() {
    if (this.selectedPackage != "") {
      localStorage.setItem("seletedPackage", JSON.stringify(this.selectedPackage));
      this.router.navigate(["/ar/payment-form"]);
    } else {
      this.error = "Please Select a points package type";
      this.showError = true;
    }
  }
  public loadProfessionalAndListingType(e: any) {
    let listingTypeId: any;
    if (e.tab.textLabel == 'Agent' || e.tab.textLabel == 'Landlord' || e.tab.textLabel == 'developer') {
      let tempPprofessionalId = '';
      this.professionalTypes.forEach((key: any, val: any) => {
        if (key.name == e.tab.textLabel) {
          tempPprofessionalId = key.id
        }
      })
      this.professionalTypeId = tempPprofessionalId;
      listingTypeId = 1;
    } else {
      let professionalId: any = document.getElementById("professionalTypeId");
      this.professionalTypeId = professionalId.value;
    }
    this.professionalAndListingType = []
    if (e.index == 1 && listingTypeId == null) {
      listingTypeId = 2;
    } else {
      listingTypeId = 1;
    }
    this.service.LoadProfessionalAndListingType(this.professionalTypeId, listingTypeId).subscribe(e => {
      let temp: any = e;
      if (temp.message == "The Packages fetched successfully") {
        for (let ProfessionalAndListingType of temp.data) {
          this.professionalAndListingType.push({
            name: ProfessionalAndListingType.name,
            nameAr: ProfessionalAndListingType.nameAr,
            price: ProfessionalAndListingType.price,
            discountPercentage: ProfessionalAndListingType.discountPercentage,
            propertyListingTypeId: ProfessionalAndListingType.propertyListingTypeId,
            professionalTypeId: ProfessionalAndListingType.professionalTypeId,
            propertyListingPackageFeatures: ProfessionalAndListingType.propertyListingPackageFeatures,
            propertyListingPackageSubFeatures: ProfessionalAndListingType.propertyListingPackageFeatures.propertyListingPackageSubFeatures,
            propertyListingType: ProfessionalAndListingType.propertyListingType,
            professionalType: ProfessionalAndListingType.professionalType,
          });
        }
      }
    });

  }
  validateButton(e: any) {
    if (e.length >= 5) {
      return true;
    } else {
      return false;
    }
  }
  platinumPopup(Platinumcontent: any) {
    this.modalService.open(Platinumcontent, { centered: true });
  }
  premiumPopup(premiumcontent: any) {
    this.modalService.open(premiumcontent, { centered: true });
  }
  freePopup(freecontent: any) {
    this.modalService.open(freecontent, { centered: true });
  }
}
