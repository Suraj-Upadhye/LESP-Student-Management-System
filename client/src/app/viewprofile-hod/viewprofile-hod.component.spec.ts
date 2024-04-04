import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofileHODComponent } from './viewprofile-hod.component';

describe('ViewprofileHODComponent', () => {
  let component: ViewprofileHODComponent;
  let fixture: ComponentFixture<ViewprofileHODComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewprofileHODComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewprofileHODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
