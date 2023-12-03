import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoServicioInfoComponent } from './pago-servicio-info.component';

describe('PagoServicioInfoComponent', () => {
  let component: PagoServicioInfoComponent;
  let fixture: ComponentFixture<PagoServicioInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoServicioInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoServicioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
