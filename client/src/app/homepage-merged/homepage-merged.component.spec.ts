import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMergedComponent } from './homepage-merged.component';

describe('HomepageMergedComponent', () => {
  let component: HomepageMergedComponent;
  let fixture: ComponentFixture<HomepageMergedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageMergedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageMergedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
