import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarContenedorComponent } from './buscar-contenedor.component';

describe('BuscarContenedorComponent', () => {
  let component: BuscarContenedorComponent;
  let fixture: ComponentFixture<BuscarContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarContenedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
