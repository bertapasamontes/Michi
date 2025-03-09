import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionDatosComponent } from './paginacion-datos.component';

describe('PaginacionDatosComponent', () => {
  let component: PaginacionDatosComponent;
  let fixture: ComponentFixture<PaginacionDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacionDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginacionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
