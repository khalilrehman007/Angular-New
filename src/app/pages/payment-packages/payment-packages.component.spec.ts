import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPackagesComponent } from './payment-packages.component';

describe('PaymentPackagesComponent', () => {
  let component: PaymentPackagesComponent;
  let fixture: ComponentFixture<PaymentPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
