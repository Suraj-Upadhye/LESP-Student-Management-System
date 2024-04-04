import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeacherRequestComponent } from './list-teacher-request.component';

describe('ListTeacherRequestComponent', () => {
  let component: ListTeacherRequestComponent;
  let fixture: ComponentFixture<ListTeacherRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTeacherRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTeacherRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
