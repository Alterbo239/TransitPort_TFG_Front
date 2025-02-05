import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarGruasComponent } from './gestionar-gruas.component';

describe('GestionarGruasComponent', () => {
  let component: GestionarGruasComponent;
  let fixture: ComponentFixture<GestionarGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarGruasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
