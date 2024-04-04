import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpageallComponent } from './loginpageall.component';

describe('LoginpageallComponent', () => {
  let component: LoginpageallComponent;
  let fixture: ComponentFixture<LoginpageallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginpageallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginpageallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
