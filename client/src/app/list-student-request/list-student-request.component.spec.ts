import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentRequestComponent } from './list-student-request.component';

describe('ListStudentRequestComponent', () => {
  let component: ListStudentRequestComponent;
  let fixture: ComponentFixture<ListStudentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStudentRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
