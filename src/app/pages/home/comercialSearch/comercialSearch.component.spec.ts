import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComercialSearchComponent } from "./comercialSearch.component";

describe('ComercialSearchComponent', () => {
  let component: ComercialSearchComponent;
  let fixture: ComponentFixture<ComercialSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComercialSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComercialSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
