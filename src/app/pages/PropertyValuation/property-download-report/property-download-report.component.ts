import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-download-report',
  templateUrl: './property-download-report.component.html',
  styleUrls: ['./property-download-report.component.scss']
})
export class PropertyDownloadReportComponent implements OnInit {
  stripe='../../../../assets/images/report.png'
  report='../../../../assets/images/icons/print.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
