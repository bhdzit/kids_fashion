import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilistasComponent } from './estilistas.component';

describe('EstilistasComponent', () => {
  let component: EstilistasComponent;
  let fixture: ComponentFixture<EstilistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstilistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstilistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
