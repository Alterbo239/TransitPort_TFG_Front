import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilOrdenadorComponent } from './perfil-ordenador.component';

describe('PerfilOrdenadorComponent', () => {
  let component: PerfilOrdenadorComponent;
  let fixture: ComponentFixture<PerfilOrdenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilOrdenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilOrdenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
