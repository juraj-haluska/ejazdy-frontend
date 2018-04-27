import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-invite-instructor-dialog',
  templateUrl: './invite-instructor-dialog.component.html'
})
export class InviteInstructorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InviteInstructorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }
}
