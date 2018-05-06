import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../model/User';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {InviteUserDialogComponent} from '../dialogs/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-students-admin',
  templateUrl: './students-admin.component.html',
  styleUrls: ['./students-admin.component.css']
})
export class StudentsAdminComponent implements OnInit {

  public displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'status', 'contextMenu'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchAllStudents();
  }

  private fetchAllStudents() {
    this.api.getAllStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource<User>(students);
      this.dataSource.paginator = this.paginator;
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

  deleteStudent(student: User) {
    this.api.deleteStudent(student.id).subscribe(deletedStudent => {
      if (deletedStudent) {
        const filteredData = this.dataSource.data.filter(i => {
          return i.id !== deletedStudent.id;
        });

        this.dataSource.data = filteredData;
      }
    });
  }
}
