import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyReviewComponent } from './property-review.component';

describe('PropertyReviewComponent', () => {
  let component: PropertyReviewComponent;
  let fixture: ComponentFixture<PropertyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
