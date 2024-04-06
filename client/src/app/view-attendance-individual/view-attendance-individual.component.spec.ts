import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendanceIndividualComponent } from './view-attendance-individual.component';

describe('ViewAttendanceIndividualComponent', () => {
  let component: ViewAttendanceIndividualComponent;
  let fixture: ComponentFixture<ViewAttendanceIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAttendanceIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAttendanceIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
