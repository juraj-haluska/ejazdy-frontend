import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsListStudentComponent } from './lessons-list-student.component';

describe('LessonsListStudentComponent', () => {
  let component: LessonsListStudentComponent;
  let fixture: ComponentFixture<LessonsListStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsListStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsListStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
