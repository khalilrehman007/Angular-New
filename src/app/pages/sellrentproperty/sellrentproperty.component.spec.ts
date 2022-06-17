import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellrentpropertyComponent } from './sellrentproperty.component';

describe('SellrentpropertyComponent', () => {
  let component: SellrentpropertyComponent;
  let fixture: ComponentFixture<SellrentpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellrentpropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellrentpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
