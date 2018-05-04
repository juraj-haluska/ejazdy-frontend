import {Component, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionList, MatSelectionListChange} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-select-student-dialog',
  templateUrl: './select-student-dialog.component.html',
  styleUrls: ['./select-student-dialog.component.css']
})
export class SelectStudentDialogComponent implements OnInit {

  students: Array<User>;
  @ViewChild('studentSelection') studentSelection: MatSelectionList;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getAllStudents().subscribe(students => {
      this.students = students;
    });

    this.studentSelection.selectionChange.subscribe((s: MatSelectionListChange) => {
      this.studentSelection.deselectAll();
      s.option.selected = true;
    });
  }

  getSelected() {
    if (this.studentSelection.selectedOptions.selected[0]) {
      return this.studentSelection.selectedOptions.selected[0].value;
    }
  }

}
