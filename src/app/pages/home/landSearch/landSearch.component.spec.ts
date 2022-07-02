import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandSearchComponent } from "./landSearch.component";

describe('LandSearchComponent', () => {
  let component: LandSearchComponent;
  let fixture: ComponentFixture<LandSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
