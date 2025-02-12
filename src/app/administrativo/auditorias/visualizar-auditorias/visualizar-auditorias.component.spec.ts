import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAuditoriasComponent } from './visualizar-auditorias.component';

describe('VisualizarAuditoriasComponent', () => {
  let component: VisualizarAuditoriasComponent;
  let fixture: ComponentFixture<VisualizarAuditoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarAuditoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAuditoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
