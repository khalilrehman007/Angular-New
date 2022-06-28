import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPaymentComponent } from './property-payment.component';

describe('PropertyPaymentComponent', () => {
  let component: PropertyPaymentComponent;
  let fixture: ComponentFixture<PropertyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
