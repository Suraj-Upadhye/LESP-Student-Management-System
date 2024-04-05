import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTeacherHodComponent } from './homepage-teacher-hod.component';

describe('HomepageTeacherHodComponent', () => {
  let component: HomepageTeacherHodComponent;
  let fixture: ComponentFixture<HomepageTeacherHodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageTeacherHodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageTeacherHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
