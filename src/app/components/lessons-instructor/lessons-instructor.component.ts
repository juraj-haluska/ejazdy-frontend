import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {MatButtonToggleGroup, MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../services/api.service';
import {CognitoService} from '../../services/cognito.service';
import {Lesson} from '../../model/Lesson';
import {SelectStudentDialogComponent} from '../dialogs/select-student-dialog/select-student-dialog.component';
import {NewLessonDialogComponent} from '../dialogs/new-lesson-dialog/new-lesson-dialog.component';

@Component({
  selector: 'app-lessons-instructor',
  templateUrl: './lessons-instructor.component.html',
  styleUrls: ['./lessons-instructor.component.css']
})
export class LessonsInstructorComponent implements OnInit {

  readonly onlyDateFormat = 'DD.MM.YYYY';
  readonly onlyTimeFormat = 'HH:mm';

  public displayedColumns = ['date', 'startTime', 'stopTime', 'student', 'contextMenu'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatButtonToggleGroup) fetchOptions: MatButtonToggleGroup;

  constructor(private api: ApiService,
              private cognito: CognitoService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchOptions.value = 'upcoming';
    this.fetchMyLessons();
  }

  addLesson() {
    const dialogRef = this.dialog.open(NewLessonDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((newLesson: Lesson) => {
      this.api.addLessonByMe(newLesson).subscribe(lesson => {
        if (lesson != null) {
          const data = this.dataSource.data;
          data.push(this.mapLessonToView(lesson));
          this.dataSource.data = data;
        }
      });
    });
  }

  fetchMyLessons() {
    const myUUID = this.cognito.getMyUUID();

    const fetchOption = this.fetchOptions.value;

    const subscribtion = (lessons) => {
      // map lessons to view model (maybe should be class for this)
      lessons.map(this.mapLessonToView);

      this.dataSource = new MatTableDataSource<any>(lessons);
      this.dataSource.paginator = this.paginator;
    };

    if (fetchOption === 'all') {
      this.api.getLessonsByInstructor(myUUID).subscribe(subscribtion);
    } else {
      this.api.getLessonsByInstructorUpcoming(myUUID).subscribe(subscribtion);
    }
  }

  // fixes undefined this
  mapLessonToView = (lesson) => {
    const mappedLesson: any = lesson;

    const startDateMoment = moment(lesson.startTime);
    const stopDateMoment = moment(lesson.stopTime);

    mappedLesson.dateString = startDateMoment.format(this.onlyDateFormat);
    mappedLesson.startDateString = startDateMoment.format(this.onlyTimeFormat);
    mappedLesson.stopDateString = stopDateMoment.format(this.onlyTimeFormat);

    return mappedLesson;
  };

  deleteLesson(lesson: Lesson) {
    this.api.deleteLesson(lesson).subscribe(deletedLesson => {

      const filteredData = this.dataSource.data.filter(l => {
        return l.instructorId !== deletedLesson.instructorId ||
          l.startTime !== deletedLesson.startTime;
      });

      this.dataSource.data = filteredData;
    });
  }

  registerStudent(lesson: Lesson) {
    const dialogRef = this.dialog.open(SelectStudentDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(selectedId => {
      if (selectedId != null) {
        this.api.registerStudentToLesson(lesson, selectedId).subscribe(registeredLesson => {
          this.updateLesson(registeredLesson);
        });
      }
    });
  }

  unregisterStudent(lesson: Lesson) {
    this.api.unregisterStudentToLesson(lesson, lesson.studentId).subscribe(unregistred => {
      this.updateLesson(unregistred);
    });
  }

  private updateLesson(lesson: Lesson) {
    this.dataSource.data = this.dataSource.data.map(lessonView => {
      if (lessonView.instructorId === lesson.instructorId &&
        lessonView.startTime === lesson.startTime) {
        return this.mapLessonToView(lesson);
      }
      return lessonView;
    });
  }
}
