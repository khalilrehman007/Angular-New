import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySelectReportComponent } from './property-select-report.component';

describe('PropertySelectReportComponent', () => {
  let component: PropertySelectReportComponent;
  let fixture: ComponentFixture<PropertySelectReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySelectReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertySelectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
