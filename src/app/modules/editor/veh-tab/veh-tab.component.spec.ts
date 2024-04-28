import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehTabComponent } from './veh-tab.component';

describe('VehTabComponent', () => {
  let component: VehTabComponent;
  let fixture: ComponentFixture<VehTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
