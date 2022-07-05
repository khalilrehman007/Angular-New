import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentpropertiesComponent } from './rentproperties.component';

describe('RentpropertiesComponent', () => {
  let component: RentpropertiesComponent;
  let fixture: ComponentFixture<RentpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentpropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
