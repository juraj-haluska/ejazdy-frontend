import {Component, OnInit} from '@angular/core';
import moment = require('moment');
import {FormControl, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialogRef} from '@angular/material';
import {Lesson} from '../../../model/Lesson';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-new-lesson-dialog',
  templateUrl: './new-lesson-dialog.component.html',
  styleUrls: ['./new-lesson-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class NewLessonDialogComponent implements OnInit {

  readonly timeFormat = 'HH:mm';
  readonly timeValidation = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');

  date = new FormControl(moment());
  startTime = new FormControl(moment().format(this.timeFormat),
    [
      Validators.required,
      Validators.pattern(this.timeValidation)
    ]
  );

  stopTime = new FormControl(moment().format(this.timeFormat),
    [
      Validators.required,
      Validators.pattern(this.timeValidation)
    ]
  );

  timeRangeError: string = null;

  constructor(public dialogRef: MatDialogRef<NewLessonDialogComponent>) {
  }

  ngOnInit() {
  }

  submit() {
    this.checkValidTimeRange();
    if (this.timeRangeError != null) {
      return;
    }

    if (this.date.valid && this.startTime.valid && this.stopTime.valid) {

      const date: moment.Moment = this.date.value;

      // parse start and stop time values from inputs to moment objects
      const startTimeParsed: moment.Moment = moment(this.startTime.value, this.timeFormat);
      const stopTimeParsed: moment.Moment = moment(this.stopTime.value, this.timeFormat);

      // create object suitable for backend
      const startTime: moment.Moment = date.clone();
      const stopTime: moment.Moment = date.clone();

      startTime.set('hour', startTimeParsed.get('hour'));
      startTime.set('minute', startTimeParsed.get('minute'));
      startTime.set('second', 0);

      stopTime.set('hour', stopTimeParsed.get('hour'));
      stopTime.set('minute', stopTimeParsed.get('minute'));
      stopTime.set('second', 0);

      if (startTime.isValid() && stopTime.isValid()) {
        const startDateIso: string = startTime.toISOString();
        const stopDateIso: string = stopTime.toISOString();

        const lesson: Lesson = {
          startTime: startDateIso,
          stopTime: stopDateIso,
          instructorId: null,
          studentId: null,
          instructorName: null,
          studentName: null
        };

        this.dialogRef.close(lesson);
      } else {
        this.dialogRef.close(null);
      }
    }
  }

  checkValidTimeRange() {
    const startTimeParsed: moment.Moment = moment(this.startTime.value, this.timeFormat);
    const stopTimeParsed: moment.Moment = moment(this.stopTime.value, this.timeFormat);

    if (startTimeParsed.isValid() && stopTimeParsed.isValid()) {
      if (startTimeParsed.isAfter(stopTimeParsed) || startTimeParsed.isSame(stopTimeParsed)) {
        this.timeRangeError = 'End of the lesson must be after it\'s start.';
      } else {
        this.timeRangeError = null;
      }
    }
  }
}
