import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllteacherlistComponent } from './allteacherlist.component';

describe('AllteacherlistComponent', () => {
  let component: AllteacherlistComponent;
  let fixture: ComponentFixture<AllteacherlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllteacherlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllteacherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
