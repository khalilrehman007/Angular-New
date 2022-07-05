import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingpackagesComponent } from './listingpackages.component';

describe('ListingpackagesComponent', () => {
  let component: ListingpackagesComponent;
  let fixture: ComponentFixture<ListingpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingpackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
