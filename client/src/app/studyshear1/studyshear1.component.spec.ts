import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studyshear1Component } from './studyshear1.component';

describe('Studyshear1Component', () => {
  let component: Studyshear1Component;
  let fixture: ComponentFixture<Studyshear1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studyshear1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Studyshear1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
