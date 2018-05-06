import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../model/User';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {InviteUserDialogComponent} from '../dialogs/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-instructors-admin',
  templateUrl: './instructors-admin.component.html',
  styleUrls: ['./instructors-admin.component.css']
})
export class InstructorsAdminComponent implements OnInit {

  public displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'status', 'contextMenu'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchAllInstructors();
  }

  private fetchAllInstructors() {
    this.api.getAllInstructors().subscribe(instructors => {
      this.dataSource = new MatTableDataSource<User>(instructors);
      this.dataSource.paginator = this.paginator;
    });
  }

  openInviteNewDialog() {
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      data: {
        title: 'Invite new instructor',
        placeholder: 'Instructor\'s email',
        email: ''
      }
    });

    dialogRef.afterClosed().subscribe(email => {
      this.api.inviteNewInstructor(email).subscribe(newInstructor => {
        const data = this.dataSource.data;
        data.push(newInstructor);
        this.dataSource.data = data;
      });
    });
  }

  deleteInstructor(instructor: User) {
    this.api.deleteInstructor(instructor.id).subscribe(deletedInstructor => {
      if (deletedInstructor) {
        const filteredData = this.dataSource.data.filter(i => {
          return i.id !== deletedInstructor.id;
        });

        this.dataSource.data = filteredData;
      }
    });
  }
}
