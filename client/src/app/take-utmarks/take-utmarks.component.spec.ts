import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeUTMarksComponent } from './take-utmarks.component';

describe('TakeUTMarksComponent', () => {
  let component: TakeUTMarksComponent;
  let fixture: ComponentFixture<TakeUTMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeUTMarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeUTMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
