import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-form-screen',
  templateUrl: './payment-form-screen.component.html',
  styleUrls: ['./payment-form-screen.component.scss'],
  providers: [DatePipe]

})
export class PaymentFormScreenComponent implements OnInit {
  stripe = 'assets/images/stripe.svg'
  loggedInUser: any = localStorage.getItem('user')
  error: any = ""
  showError: boolean = false;
  showLoader: boolean = false;
  seletedPackage: any = "";
  minDate = new Date();
  pointsData: any = "";
  pointsHistory: any = "";
  myBalance: any = 0;
  showSuccess: boolean = false;
  success: any = "";
  successResponse(data: any) {
    this.router.navigate(["/ar/payment-packages"]);
    this.showSuccess = false;
  }
  errorResponse(data: any) {
    this.showError = false;
  }
  constructor(private authService: AuthService, private datePipe: DatePipe, private service: AppService, private modalService: NgbModal, private router : Router) {
    if(!localStorage.getItem("seletedPackage")) {
      this.router.navigate(["/ar/payment-packages"])
    }
    this.seletedPackage = localStorage.getItem("seletedPackage");
    this.seletedPackage = JSON.parse(this.seletedPackage);
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.getPoints();
    this.service.GetPoints(1).subscribe((result: any) => {
      this.pointsData = result.data;
    })
    this.service.PointTransaction(this.loggedInUser.id).subscribe((result: any) => {
      this.pointsHistory = result.data;
    })
  }

  ngOnInit(): void {
  }
  getPoints() {
    this.service.MyWallet(this.loggedInUser.id).subscribe((result: any) => {
      this.myBalance = result.data;
    })
  }
  cardForm = new FormGroup({
    cardNumber: new FormControl("", Validators.required),
    expiryDate: new FormControl("", Validators.required),
    cvv: new FormControl("", Validators.required),
    cardName: new FormControl("", Validators.required)
  })

  logOutPopup(content: any) {
    this.modalService.open(content, { centered: true });
  }
  rechargePopup(rechargemodal: any) {
    this.seletedPackage = "";
    this.modalService.open(rechargemodal, { centered: true });
  }
  PaymentPopup(PaymentPopupModal: any) {
    if (this.seletedPackage == "") {
      this.error = "الرجاء اختيار نوع النقاط للباقات  ";
      this.showError = true;
      return;
    }
    this.modalService.open(PaymentPopupModal, { centered: true });
  }
  TransferPopup(TransferModal: any) {
    this.modalService.open(TransferModal, { centered: true });
  }

  purchasePoints() {
    let number: any = this.cardForm.value.cardNumber;
    let date: any = this.cardForm.value.expiryDate;
    let cvv: any = this.cardForm.value.cvv;
    let currentDate: any = this.datePipe.transform(this.minDate, 'yyyy-MM-dd')?.split("-");
    if (this.cardForm.value.cardNumber == "" || this.cardForm.value.cardNumber == null) {
      this.error = "الرجاء ادخال رقم البطاقة ";
      this.showError = true;
      return;
    } else if (number.toString().length < 16) {
      this.error = "الرجاء ادخال رقم بطاقة فعالة ";
      this.showError = true;
      return;
    } else if (this.cardForm.value.expiryDate == "") {
      this.error = "الرجاء ادخال تاريخ انتهاء البطاقة ";
      this.showError = true;
      return;
    } else if (date.toString().length < 5) {
      this.error = "الرجاء ادخال تاريخ رقم البطاقة الفعالة ";
      this.showError = true;
      return;
    } else if ("20" + date.toString().split("/")[1] < currentDate[0]) {
      this.error = "الرجاء ادخال تاريخ رقم البطاقة الفعالة ";
      this.showError = true;
      return;
    } else if ("20" + date.toString().split("/")[1] == currentDate[0] && date.toString().split("/")[0] < currentDate[1] || date.toString().split("/")[0] > 12) {
      this.error = "الرجاء ادخال تاريخ رقم البطاقة الفعالة ";
      this.showError = true;
      return;
    } else if (this.cardForm.value.cvv == "" || this.cardForm.value.cvv == null) {
      this.error = "الرجاء ادخال الرمز ";
      this.showError = true;
      return;
    } else if (cvv.toString().length < 3) {
      this.error = "الرجاء ادخال الرمز الفعال ";
      this.showError = true;
      return;
    } else if (this.cardForm.value.cardName == "" || this.cardForm.value.cardName == null) {
      this.error = "الرجاء ادخال اسم حامل البطاقة";
      this.showError = true;
    }
    this.showLoader = true;
    let temp: any = {};
    temp.UserId = this.loggedInUser.id;
    temp.Email = this.loggedInUser.email;
    temp.PointId = this.seletedPackage.id;
    temp.CardNumder = this.cardForm.value.cardNumber;
    temp.CardNumder = this.cardForm.value.cardNumber;
    temp.Month = date.split("/")[0];
    temp.Year = date.split("/")[1];
    temp.CVC = this.cardForm.value.cvv;
    temp.Amount = this.seletedPackage.price;
    temp.CustomerName = this.cardForm.value.cardName;
    temp.Currency = this.seletedPackage.country.currency;
    temp.DescriptionPayment = "Point Package";
    this.service.PointPayment(temp).subscribe((result:any) => {
      if(result.message == "Purchasing Point is completed successfully") {
        this.showLoader = false;
        this.success = "Payment Successful"
        this.showSuccess = true;
      } else {
        this.error = result.message;
        this.showError = true;
      }
    })
  }
  onKeypressEvent(e: any) {
    this.checkLength(3, false)
  }

  checkLength(e: any, type: boolean) {
    if (e == 1) {
      let temp: any = this.cardForm.value.cardNumber;
      if (temp != null) {
        if (temp.toString().length > 16) {
          this.cardForm.patchValue({
            cardNumber: temp.toString().slice(0, -1)
          })
        }
      }
    } else if (e == 2) {
      let temp: any = this.cardForm.value.cvv;
      if (temp.toString().length > 4) {
        this.cardForm.patchValue({
          cvv: temp.toString().slice(0, -1)
        })
      }
    } else if (e == 3) {
      let temp: any = this.cardForm.value.expiryDate;
      if (temp.replace("/", "") >= 0) {
        if (temp.toString().length == 2 && !type) {
          this.cardForm.patchValue({
            expiryDate: temp.toString() + "/"
          })
        } else if (temp.toString().length == 3 && type) {
          this.cardForm.patchValue({
            expiryDate: temp.toString().slice(0, -1)
          })
        } else if (temp.toString().length > 5) {
          this.cardForm.patchValue({
            expiryDate: temp.toString().slice(0, -1)
          })
        }
      } else {
        this.cardForm.patchValue({
          expiryDate: temp.toString().slice(0, -1)
        })
      }
    }
  }
}
