import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsAdminComponent } from './lessons-admin.component';

describe('LessonsAdminComponent', () => {
  let component: LessonsAdminComponent;
  let fixture: ComponentFixture<LessonsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
