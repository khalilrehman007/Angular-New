import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersoftypeComponent } from './filtersoftype.component';

describe('FiltersoftypeComponent', () => {
  let component: FiltersoftypeComponent;
  let fixture: ComponentFixture<FiltersoftypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersoftypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersoftypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
