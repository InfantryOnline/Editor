import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItmTabComponent } from './itm-tab.component';

describe('ItmTabComponent', () => {
  let component: ItmTabComponent;
  let fixture: ComponentFixture<ItmTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItmTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItmTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
