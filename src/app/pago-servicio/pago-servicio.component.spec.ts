import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoServicioComponent } from './pago-servicio.component';

describe('PagoServicioComponent', () => {
  let component: PagoServicioComponent;
  let fixture: ComponentFixture<PagoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
