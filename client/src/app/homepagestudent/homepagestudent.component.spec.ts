import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagestudentComponent } from './homepagestudent.component';

describe('HomepagestudentComponent', () => {
  let component: HomepagestudentComponent;
  let fixture: ComponentFixture<HomepagestudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepagestudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepagestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
