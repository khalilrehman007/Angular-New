import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInnerComponent } from './property-inner.component';

describe('PropertyInnerComponent', () => {
  let component: PropertyInnerComponent;
  let fixture: ComponentFixture<PropertyInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyInnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
