import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../model/User';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {InviteUserDialogComponent} from '../dialogs/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent implements OnInit {

  public displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'status'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchAllStudents();
  }

  private fetchAllStudents() {
    this.api.getAllStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource<User>(students);
    });
  }

  openInviteNewDialog() {
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      data: {
        title: 'Invite new student',
        placeholder: 'Student\'s email',
        email: ''
      }
    });

    dialogRef.afterClosed().subscribe(email => {
      this.api.inviteNewStudent(email).subscribe(newStudent => {
        const data = this.dataSource.data;
        data.push(newStudent);
        this.dataSource.data = data;
      });
    });
  }
}
