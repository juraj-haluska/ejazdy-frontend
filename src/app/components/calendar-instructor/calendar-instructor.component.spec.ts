import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInstructorComponent } from './calendar-instructor.component';

describe('CalendarInstructorComponent', () => {
  let component: CalendarInstructorComponent;
  let fixture: ComponentFixture<CalendarInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
