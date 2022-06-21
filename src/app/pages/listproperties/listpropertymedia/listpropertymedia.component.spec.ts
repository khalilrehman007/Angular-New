import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpropertymediaComponent } from './listpropertymedia.component';

describe('ListpropertymediaComponent', () => {
  let component: ListpropertymediaComponent;
  let fixture: ComponentFixture<ListpropertymediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpropertymediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpropertymediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
