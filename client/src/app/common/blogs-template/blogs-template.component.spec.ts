import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsTemplateComponent } from './blogs-template.component';

describe('BlogsTemplateComponent', () => {
  let component: BlogsTemplateComponent;
  let fixture: ComponentFixture<BlogsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
