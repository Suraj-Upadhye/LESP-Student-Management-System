import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUtmarksComponent } from './view-utmarks.component';

describe('ViewUtmarksComponent', () => {
  let component: ViewUtmarksComponent;
  let fixture: ComponentFixture<ViewUtmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUtmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUtmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
