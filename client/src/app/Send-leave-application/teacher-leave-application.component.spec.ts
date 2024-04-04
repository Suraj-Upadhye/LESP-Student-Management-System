import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLeaveApplicationComponent } from './teacher-leave-application.component';

describe('TeacherLeaveApplicationComponent', () => {
  let component: TeacherLeaveApplicationComponent;
  let fixture: ComponentFixture<TeacherLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLeaveApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
