import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyticsSearchResultsComponent } from './data-analytics-search-results.component';

describe('DataAnalyticsSearchResultsComponent', () => {
  let component: DataAnalyticsSearchResultsComponent;
  let fixture: ComponentFixture<DataAnalyticsSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalyticsSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAnalyticsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
