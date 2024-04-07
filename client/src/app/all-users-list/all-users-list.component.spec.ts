import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersListComponent } from './all-users-list.component';

describe('AllUsersListComponent', () => {
  let component: AllUsersListComponent;
  let fixture: ComponentFixture<AllUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
