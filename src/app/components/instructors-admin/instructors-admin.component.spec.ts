import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsAdminComponent } from './instructors-admin.component';

describe('InstructorsAdminComponent', () => {
  let component: InstructorsAdminComponent;
  let fixture: ComponentFixture<InstructorsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
