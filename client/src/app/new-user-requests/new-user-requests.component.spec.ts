import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserRequestsComponent } from './new-user-requests.component';

describe('NewUserRequestsComponent', () => {
  let component: NewUserRequestsComponent;
  let fixture: ComponentFixture<NewUserRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUserRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
