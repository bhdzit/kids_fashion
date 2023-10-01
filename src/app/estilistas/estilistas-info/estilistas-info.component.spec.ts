import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilistasInfoComponent } from './estilistas-info.component';

describe('EstilistasInfoComponent', () => {
  let component: EstilistasInfoComponent;
  let fixture: ComponentFixture<EstilistasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstilistasInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstilistasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
