import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuySearchComponent } from "./buySearch.component";

describe('BuySearchComponent', () => {
  let component: BuySearchComponent;
  let fixture: ComponentFixture<BuySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
