import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../services/api.service';
import {CognitoService} from '../../services/cognito.service';
import * as moment from 'moment';

@Component({
  selector: 'app-lessons-list-student',
  templateUrl: './lessons-list-student.component.html',
  styleUrls: ['./lessons-list-student.component.css']
})
export class LessonsListStudentComponent implements OnInit {

  readonly onlyDateFormat = 'DD.MM.YYYY';
  readonly onlyTimeFormat = 'HH:mm';

  public displayedColumns = ['date', 'startTime', 'stopTime', 'instructor'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private cognito: CognitoService) { }

  ngOnInit() {
    this.fetchMyLessons();
  }

  fetchMyLessons() {
    const myUUID = this.cognito.getMyUUID();

    this.api.getLessonsByMeUpcoming().subscribe((lessons) => {
      // map lessons to view model (maybe should be class for this)
      lessons.map(this.mapLessonToView);

      this.dataSource = new MatTableDataSource<any>(lessons);
      this.dataSource.paginator = this.paginator;
    });
  }

  // I know it's copied from another component but in
  // future this function might be different
  mapLessonToView = (lesson) => {
    const mappedLesson: any = lesson;

    const startDateMoment = moment(lesson.startTime);
    const stopDateMoment = moment(lesson.stopTime);

    mappedLesson.dateString = startDateMoment.format(this.onlyDateFormat);
    mappedLesson.startDateString = startDateMoment.format(this.onlyTimeFormat);
    mappedLesson.stopDateString = stopDateMoment.format(this.onlyTimeFormat);

    return mappedLesson;
  };
}
