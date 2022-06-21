import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpropertyverifyComponent } from './listpropertyverify.component';

describe('ListpropertyverifyComponent', () => {
  let component: ListpropertyverifyComponent;
  let fixture: ComponentFixture<ListpropertyverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpropertyverifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpropertyverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
