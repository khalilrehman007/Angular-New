import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCommertialComponent } from './rent-commertial.component';

describe('RentCommertialComponent', () => {
  let component: RentCommertialComponent;
  let fixture: ComponentFixture<RentCommertialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentCommertialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentCommertialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
