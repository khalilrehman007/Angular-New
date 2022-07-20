import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPropertiesComponent } from './buy-properties.component';

describe('BuyPropertiesComponent', () => {
  let component: BuyPropertiesComponent;
  let fixture: ComponentFixture<BuyPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
