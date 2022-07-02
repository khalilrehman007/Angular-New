import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindAgentSearchComponent } from "./findAgentSearch.component";

describe('FindAgentSearchComponent', () => {
  let component: FindAgentSearchComponent;
  let fixture: ComponentFixture<FindAgentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAgentSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAgentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
