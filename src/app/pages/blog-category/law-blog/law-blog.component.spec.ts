import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawBlogComponent } from './law-blog.component';

describe('LawBlogComponent', () => {
  let component: LawBlogComponent;
  let fixture: ComponentFixture<LawBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
