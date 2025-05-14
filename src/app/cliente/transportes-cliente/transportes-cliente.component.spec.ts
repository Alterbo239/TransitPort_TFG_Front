import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportesClienteComponent } from './transportes-cliente.component';

describe('TransportesClienteComponent', () => {
  let component: TransportesClienteComponent;
  let fixture: ComponentFixture<TransportesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportesClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
