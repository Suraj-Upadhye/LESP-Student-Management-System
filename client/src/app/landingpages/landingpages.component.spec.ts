import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpagesComponent } from './landingpages.component';

describe('LandingpagesComponent', () => {
  let component: LandingpagesComponent;
  let fixture: ComponentFixture<LandingpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
