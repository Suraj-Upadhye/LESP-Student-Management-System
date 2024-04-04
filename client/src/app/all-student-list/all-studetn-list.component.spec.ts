import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudetnListComponent } from './all-studetn-list.component';

describe('AllStudetnListComponent', () => {
  let component: AllStudetnListComponent;
  let fixture: ComponentFixture<AllStudetnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStudetnListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllStudetnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
