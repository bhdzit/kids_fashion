import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesInfoComponent } from './promociones-info.component';

describe('PromocionesInfoComponent', () => {
  let component: PromocionesInfoComponent;
  let fixture: ComponentFixture<PromocionesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionesInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
