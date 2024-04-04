import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofilestudentComponent } from './viewprofilestudent.component';

describe('ViewprofilestudentComponent', () => {
  let component: ViewprofilestudentComponent;
  let fixture: ComponentFixture<ViewprofilestudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewprofilestudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewprofilestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
