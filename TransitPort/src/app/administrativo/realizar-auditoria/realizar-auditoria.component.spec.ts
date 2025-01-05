import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarAuditoriaComponent } from './realizar-auditoria.component';

describe('RealizarAuditoriaComponent', () => {
  let component: RealizarAuditoriaComponent;
  let fixture: ComponentFixture<RealizarAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarAuditoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
