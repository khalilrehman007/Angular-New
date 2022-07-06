import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCompareComponent } from './property-compare.component';

describe('PropertyCompareComponent', () => {
  let component: PropertyCompareComponent;
  let fixture: ComponentFixture<PropertyCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
