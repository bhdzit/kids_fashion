import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasInfoComponent } from './citas-info.component';

describe('CitasInfoComponent', () => {
  let component: CitasInfoComponent;
  let fixture: ComponentFixture<CitasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
