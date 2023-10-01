import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosInfoComponent } from './servicios-info.component';

describe('ServiciosInfoDialogComponent', () => {
  let component: ServiciosInfoComponent;
  let fixture: ComponentFixture<ServiciosInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
