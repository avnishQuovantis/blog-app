import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryBlogComponent } from './catagory-blog.component';

describe('CatagoryBlogComponent', () => {
  let component: CatagoryBlogComponent;
  let fixture: ComponentFixture<CatagoryBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagoryBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
