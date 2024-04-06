import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUtmarksIndividualComponent } from './view-utmarks-individual.component';

describe('ViewUtmarksIndividualComponent', () => {
  let component: ViewUtmarksIndividualComponent;
  let fixture: ComponentFixture<ViewUtmarksIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUtmarksIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUtmarksIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
