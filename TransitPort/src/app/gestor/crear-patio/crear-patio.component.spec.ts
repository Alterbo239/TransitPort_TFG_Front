import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPatioComponent } from './crear-patio.component';

describe('CrearPatioComponent', () => {
  let component: CrearPatioComponent;
  let fixture: ComponentFixture<CrearPatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPatioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
