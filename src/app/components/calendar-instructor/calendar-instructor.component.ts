import {Component, OnInit} from '@angular/core';
import moment = require('moment');
import {MatTableDataSource} from '@angular/material';
import {ApiService} from '../../services/api.service';
import {CognitoService} from '../../services/cognito.service';

@Component({
  selector: 'app-calendar-instructor',
  templateUrl: './calendar-instructor.component.html',
  styleUrls: ['./calendar-instructor.component.css']
})
export class CalendarInstructorComponent implements OnInit {

  readonly dateFormat = 'YYYY-MM-DDThh:mm';
  readonly onlyDateFormat = 'YYYY-MM-DD';
  readonly onlyTimeFormat = 'hh:mm';

  public startDate: string;
  public stopDate: string;

  public displayedColumns = ['date', 'startTime', 'stopTime', 'student'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private api: ApiService, private cognito: CognitoService) {
  }

  ngOnInit() {
    this.startDate = moment().format(this.dateFormat);
    this.stopDate = moment().format(this.dateFormat);
    this.fetchMyLessons();
  }

  addLesson() {
    const startDate: moment.Moment = moment(this.startDate, this.dateFormat);
    const stopDate: moment.Moment = moment(this.stopDate, this.dateFormat);

    if (startDate.isValid() && stopDate.isValid()) {
      const startDateIso: string = startDate.toISOString();
      const stopDateIso: string = stopDate.toISOString();

      const newLesson = {
        instructorId: null,
        startTime: startDateIso,
        stopTime: stopDateIso,
        studentId: null
      };

      this.api.addLessonByMe(newLesson).subscribe(lesson => {
        const data = this.dataSource.data;
        data.push(this.mapLessonToView(lesson));
        this.dataSource.data = data;
      });
    }
  }

  fetchMyLessons() {
    const myUUID = this.cognito.getMyUUID();
    this.api.getLessonsByInstructor(myUUID).subscribe(lessons => {

      // map lessons to view model (maybe should be class for this)
      lessons.map(this.mapLessonToView);

      this.dataSource = new MatTableDataSource<any>(lessons);
    });
  }

  // fixes undefined this
  mapLessonToView = (lesson) => {
    const mappedLesson: any = lesson;

    const startDateMoment = moment(lesson.startTime);
    const stopDateMoment = moment(lesson.stopTime);

    console.log(startDateMoment);

    mappedLesson.dateString = startDateMoment.format(this.onlyDateFormat);
    mappedLesson.startDateString = startDateMoment.format(this.onlyTimeFormat);
    mappedLesson.stopDateString = stopDateMoment.format(this.onlyTimeFormat);

    return mappedLesson;
  }
}
