import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofileteacherComponent } from './viewprofileteacher.component';

describe('ViewprofileteacherComponent', () => {
  let component: ViewprofileteacherComponent;
  let fixture: ComponentFixture<ViewprofileteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewprofileteacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewprofileteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
