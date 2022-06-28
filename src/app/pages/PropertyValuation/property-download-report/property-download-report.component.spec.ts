import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDownloadReportComponent } from './property-download-report.component';

describe('PropertyDownloadReportComponent', () => {
  let component: PropertyDownloadReportComponent;
  let fixture: ComponentFixture<PropertyDownloadReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDownloadReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDownloadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
