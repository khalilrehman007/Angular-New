import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpropertyinfoComponent } from './listpropertyinfo.component';

describe('ListpropertyinfoComponent', () => {
  let component: ListpropertyinfoComponent;
  let fixture: ComponentFixture<ListpropertyinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpropertyinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpropertyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
