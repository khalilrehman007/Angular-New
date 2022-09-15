import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToValuation(e:any) {
    console.log(e);
    localStorage.setItem("valuationFromFooter", e);
    this.router.navigate(["/valuation/property-detail"]);
  }
}
