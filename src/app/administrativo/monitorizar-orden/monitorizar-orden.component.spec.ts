import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorizarOrdenComponent } from './monitorizar-orden.component';

describe('MonitorizarOrdenComponent', () => {
  let component: MonitorizarOrdenComponent;
  let fixture: ComponentFixture<MonitorizarOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorizarOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorizarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
