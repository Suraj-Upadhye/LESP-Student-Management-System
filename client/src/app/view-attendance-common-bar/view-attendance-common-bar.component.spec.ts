import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendanceCommonBarComponent } from './view-attendance-common-bar.component';

describe('ViewAttendanceCommonBarComponent', () => {
  let component: ViewAttendanceCommonBarComponent;
  let fixture: ComponentFixture<ViewAttendanceCommonBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAttendanceCommonBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAttendanceCommonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
