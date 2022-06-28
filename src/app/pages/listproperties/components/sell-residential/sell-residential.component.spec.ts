import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellResidentialComponent } from './sell-residential.component';

describe('SellResidentialComponent', () => {
  let component: SellResidentialComponent;
  let fixture: ComponentFixture<SellResidentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellResidentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellResidentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
