import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyinfoComponent } from './propertyinfo.component';

describe('PropertyinfoComponent', () => {
  let component: PropertyinfoComponent;
  let fixture: ComponentFixture<PropertyinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
