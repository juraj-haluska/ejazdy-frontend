import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsRegStudentComponent } from './lessons-reg-student.component';

describe('LessonsRegStudentComponent', () => {
  let component: LessonsRegStudentComponent;
  let fixture: ComponentFixture<LessonsRegStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsRegStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsRegStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
