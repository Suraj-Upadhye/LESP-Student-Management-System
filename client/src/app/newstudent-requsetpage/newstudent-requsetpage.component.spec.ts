import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstudentRequsetpageComponent } from './newstudent-requsetpage.component';

describe('NewstudentRequsetpageComponent', () => {
  let component: NewstudentRequsetpageComponent;
  let fixture: ComponentFixture<NewstudentRequsetpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewstudentRequsetpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewstudentRequsetpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
