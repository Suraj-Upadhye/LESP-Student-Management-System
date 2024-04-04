import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUspageComponent } from './about-uspage.component';

describe('AboutUspageComponent', () => {
  let component: AboutUspageComponent;
  let fixture: ComponentFixture<AboutUspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUspageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutUspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
