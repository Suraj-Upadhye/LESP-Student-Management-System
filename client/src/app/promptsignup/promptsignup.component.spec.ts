import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptsignupComponent } from './promptsignup.component';

describe('PromptsignupComponent', () => {
  let component: PromptsignupComponent;
  let fixture: ComponentFixture<PromptsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptsignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
