import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGruasComponent } from './crear-gruas.component';

describe('CrearGruasComponent', () => {
  let component: CrearGruasComponent;
  let fixture: ComponentFixture<CrearGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGruasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
