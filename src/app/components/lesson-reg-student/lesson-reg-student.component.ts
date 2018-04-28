import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {CognitoService} from '../../services/cognito.service';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material';
import moment = require('moment');
import {Lesson} from '../../model/Lesson';

@Component({
  selector: 'app-lesson-reg-student',
  templateUrl: './lesson-reg-student.component.html',
  styleUrls: ['./lesson-reg-student.component.css']
})
export class LessonRegStudentComponent implements OnInit {

  instructors: Array<User> = new Array<User>();
  selectedInstructorId: string;

  readonly onlyDateFormat = 'YYYY-MM-DD';
  readonly onlyTimeFormat = 'hh:mm';

  public displayedColumns = ['date', 'startTime', 'stopTime', 'status'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(public cognito: CognitoService,
              private api: ApiService) {

  }

  ngOnInit() {
    this.fetchInstructors();
  }

  fetchInstructors() {
    this.api.getAllInstructors().subscribe(instructors => {
      this.instructors = instructors;
    });
  }

  onInstructorSelected() {
    this.fetchLessonsByInstructor(this.selectedInstructorId);
  }

  fetchLessonsByInstructor(instructorId: string) {
    this.api.getLessonsByInstructor(instructorId).subscribe(lessons => {
      lessons.map(this.mapLessonToView);
      this.dataSource = new MatTableDataSource<any>(lessons);
    });
  }

  mapLessonToView = (lesson) => {
    const mappedLesson: any = lesson;

    const startDateMoment = moment(lesson.startTime);
    const stopDateMoment = moment(lesson.stopTime);

    mappedLesson.dateString = startDateMoment.format(this.onlyDateFormat);
    mappedLesson.startDateString = startDateMoment.format(this.onlyTimeFormat);
    mappedLesson.stopDateString = stopDateMoment.format(this.onlyTimeFormat);

    return mappedLesson;
  };

  registerMe(lesson: Lesson) {
    lesson.studentId = this.cognito.getMyUUID();

    this.api.registerMeToLesson(lesson).subscribe(registered => {

        const lessons: Array<Lesson> = this.dataSource.data;

        const newLessons = lessons.map(l => {
          if (l.instructorId === registered.instructorId && l.startTime === registered.startTime) {
            return this.mapLessonToView(registered);
          } else {
            return l;
          }
        });

        this.dataSource.data = newLessons;
      }
    );
  }

  unRegisterMe(lesson: Lesson) {
    lesson.studentId = null;

    this.api.unregisterMeFromLesson(lesson).subscribe(registered => {

        const lessons: Array<Lesson> = this.dataSource.data;

        const newLessons = lessons.map(l => {
          if (l.instructorId === registered.instructorId && l.startTime === registered.startTime) {
            return this.mapLessonToView(registered);
          } else {
            return l;
          }
        });

        this.dataSource.data = newLessons;
      }
    );
  }

}
