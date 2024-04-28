import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LioTabComponent } from './lio-tab.component';

describe('LioTabComponent', () => {
  let component: LioTabComponent;
  let fixture: ComponentFixture<LioTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LioTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LioTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
