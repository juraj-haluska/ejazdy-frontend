import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonRegStudentComponent } from './lesson-reg-student.component';

describe('LessonRegStudentComponent', () => {
  let component: LessonRegStudentComponent;
  let fixture: ComponentFixture<LessonRegStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonRegStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonRegStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
