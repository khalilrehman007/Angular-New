import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpropertypublishComponent } from './listpropertypublish.component';

describe('ListpropertypublishComponent', () => {
  let component: ListpropertypublishComponent;
  let fixture: ComponentFixture<ListpropertypublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpropertypublishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpropertypublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
