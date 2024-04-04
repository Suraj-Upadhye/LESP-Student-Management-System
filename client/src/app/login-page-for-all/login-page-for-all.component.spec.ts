import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageForAllComponent } from './login-page-for-all.component';

describe('LoginPageForAllComponent', () => {
  let component: LoginPageForAllComponent;
  let fixture: ComponentFixture<LoginPageForAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageForAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPageForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
