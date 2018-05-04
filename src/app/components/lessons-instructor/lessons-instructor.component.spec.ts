import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsInstructorComponent } from './lessons-instructor.component';

describe('LessonsInstructorComponent', () => {
  let component: LessonsInstructorComponent;
  let fixture: ComponentFixture<LessonsInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
