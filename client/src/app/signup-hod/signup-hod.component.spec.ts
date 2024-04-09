import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupHodComponent } from './signup-hod.component';

describe('SignupHodComponent', () => {
  let component: SignupHodComponent;
  let fixture: ComponentFixture<SignupHodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupHodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
