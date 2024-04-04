import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMergedComponent } from './header-merged.component';

describe('HeaderMergedComponent', () => {
  let component: HeaderMergedComponent;
  let fixture: ComponentFixture<HeaderMergedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMergedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMergedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
