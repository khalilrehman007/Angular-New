import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreBlogComponent } from './explore-blog.component';

describe('ExploreBlogComponent', () => {
  let component: ExploreBlogComponent;
  let fixture: ComponentFixture<ExploreBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
