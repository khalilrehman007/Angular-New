import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAtHomeBlogComponent } from './life-at-home-blog.component';

describe('LifeAtHomeBlogComponent', () => {
  let component: LifeAtHomeBlogComponent;
  let fixture: ComponentFixture<LifeAtHomeBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeAtHomeBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeAtHomeBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
