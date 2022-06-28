import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCommertialComponent } from './sell-commertial.component';

describe('SellCommertialComponent', () => {
  let component: SellCommertialComponent;
  let fixture: ComponentFixture<SellCommertialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellCommertialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCommertialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
