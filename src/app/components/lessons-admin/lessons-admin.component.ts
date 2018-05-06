import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonToggleGroup, MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../services/api.service';
import {User} from '../../model/User';
import * as moment from 'moment';
import {Lesson} from '../../model/Lesson';
import {SelectStudentDialogComponent} from '../dialogs/select-student-dialog/select-student-dialog.component';

@Component({
  selector: 'app-lessons-admin',
  templateUrl: './lessons-admin.component.html',
  styleUrls: ['./lessons-admin.component.css']
})
export class LessonsAdminComponent implements OnInit {

  instructors: Array<User> = new Array<User>();
  selectedInstructorId: string;

  public displayedColumns = ['date', 'startTime', 'stopTime', 'student', 'contextMenu'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  readonly onlyDateFormat = 'DD.MM.YYYY';
  readonly onlyTimeFormat = 'HH:mm';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatButtonToggleGroup) fetchOptions: MatButtonToggleGroup;

  constructor(private api: ApiService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchOptions.value = 'upcoming';
    this.fetchInstructors();
  }

  fetchInstructors() {
    this.api.getAllInstructors().subscribe(instructors => {
      this.instructors = instructors;
      if (this.instructors.length > 0) {
        this.selectedInstructorId = this.instructors[0].id;
        this.onInstructorSelected();
      }
    });
  }

  onInstructorSelected() {
    this.fetchLessonsByInstructor(this.selectedInstructorId);
  }

  fetchLessonsByInstructor(instructorId: string) {
    const fetchOption = this.fetchOptions.value;

    const subscribtion = (lessons) => {
      // map lessons to view model (maybe should be class for this)
      lessons.map(this.mapLessonToView);

      this.dataSource = new MatTableDataSource<any>(lessons);
      this.dataSource.paginator = this.paginator;
    };

    if (fetchOption === 'all') {
      this.api.getLessonsByInstructor(instructorId).subscribe(subscribtion);
    } else {
      this.api.getLessonsByInstructorUpcoming(instructorId).subscribe(subscribtion);
    }
  }

  mapLessonToView = (lesson) => {
    const mappedLesson: any = lesson;

    const startDateMoment = moment(lesson.startTime);
    const stopDateMoment = moment(lesson.stopTime);

    mappedLesson.dateString = startDateMoment.format(this.onlyDateFormat);
    mappedLesson.startDateString = startDateMoment.format(this.onlyTimeFormat);
    mappedLesson.stopDateString = stopDateMoment.format(this.onlyTimeFormat);

    return mappedLesson;
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

  deleteLesson(lesson: Lesson) {
    this.api.deleteLesson(lesson).subscribe(deletedLesson => {

      const filteredData = this.dataSource.data.filter(l => {
        return l.instructorId !== deletedLesson.instructorId ||
          l.startTime !== deletedLesson.startTime;
      });

      this.dataSource.data = filteredData;
    });
  }
}
