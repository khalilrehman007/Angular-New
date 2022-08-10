import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTrendsBlogComponent } from './market-trends-blog.component';

describe('MarketTrendsBlogComponent', () => {
  let component: MarketTrendsBlogComponent;
  let fixture: ComponentFixture<MarketTrendsBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketTrendsBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketTrendsBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
