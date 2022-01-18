import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateWaterComponent } from './simulate-water-water.component';

describe('SimulateWaterComponent', () => {
  let component: SimulateWaterComponent;
  let fixture: ComponentFixture<SimulateWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
