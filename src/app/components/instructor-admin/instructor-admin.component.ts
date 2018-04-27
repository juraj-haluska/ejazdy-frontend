import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../model/User';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {InviteInstructorDialogComponent} from '../dialogs/invite-instructor-dialog/invite-instructor-dialog.component';

@Component({
  selector: 'app-instructor-admin',
  templateUrl: './instructor-admin.component.html',
  styleUrls: ['./instructor-admin.component.css']
})
export class InstructorAdminComponent implements OnInit {

  public displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'status'];
  public dataSource: MatTableDataSource<User>;

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchAllInstructors();
  }

  private fetchAllInstructors() {
    this.api.getAllInstructors().subscribe(instructors => {
      this.dataSource = new MatTableDataSource<User>(instructors);
    });
  }

  openInviteNewDialog() {
    const dialogRef = this.dialog.open(InviteInstructorDialogComponent, {
      width: '300px',
      data: {email: ''}
    });

    dialogRef.afterClosed().subscribe(email => {
      this.api.inviteNewInstructor(email).subscribe(newInstructor => {
        const data = this.dataSource.data;
        data.push(newInstructor);
        this.dataSource.data = data;
      });
    });
  }

}
