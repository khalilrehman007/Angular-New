import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-property-download-report',
  templateUrl: './property-download-report.component.html',
  styleUrls: ['./property-download-report.component.scss']
})
export class PropertyDownloadReportComponent implements OnInit {
  stripe = '../../../../assets/images/report.png'
  report = '../../../../assets/images/icons/print.svg'
  valuationResponse: any = {};
  showLoader: boolean = false;
  constructor(private service: AppService) {
    this.valuationResponse = localStorage.getItem("valuationResponse");
    this.valuationResponse = JSON.parse(this.valuationResponse);
  }
  downloadReport() {
    this.showLoader = true;
    // this.service.GenerateReport(this.valuationResponse.reportNumberCode).subscribe((result:any) => {
    //   console.log(result);
    //   this.showLoader = false;
    // });
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    $.ajax({
      // url: "https://beta.ovaluate.com/api/GenerateReport?ReportNumberCode=" + this.valuationResponse.reportNumberCode,
      method: "post",
      headers: {
        "Authorization": 'bearer ' + token
      },
      dataType: "json",
      success: (res) => {
        this.showLoader = false;
        console.log(res.body)
      },
      error: (err) => {
        console.log("error");
      }
    });
  }
  ngOnInit(): void {
  }

}
