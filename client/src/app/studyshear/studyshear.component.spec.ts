import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyshearComponent } from './studyshear.component';

describe('StudyshearComponent', () => {
  let component: StudyshearComponent;
  let fixture: ComponentFixture<StudyshearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyshearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyshearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
