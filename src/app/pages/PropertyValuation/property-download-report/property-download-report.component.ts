import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-property-download-report',
  templateUrl: './property-download-report.component.html',
  styleUrls: ['./property-download-report.component.scss']
})
export class PropertyDownloadReportComponent implements OnInit {
  stripe = '../../../../assets/images/report.png'
  report = '../../../../assets/images/icons/print.svg'
  download = '../../../../assets/images/download.gif'
  valuationResponse: any = {};
  showLoader: boolean = false;
  constructor(private service: AppService, private router: Router) {
    this.valuationResponse = localStorage.getItem("valuationResponse");
    this.valuationResponse = JSON.parse(this.valuationResponse);
  }
  downloadReport() {
    this.showLoader = true;
    this.service.GenerateReport(this.valuationResponse.reportNumberCode).subscribe((result: any) => {
      console.log(result.body);
      var blob = new Blob([result.body]);
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.valuationResponse.reportNumberCode + ".pdf";
      link.click();
      this.showLoader = false;
    });
  }
  ngOnInit(): void {
  }

}
