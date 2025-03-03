import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCerrarSesionComponent } from './link-cerrar-sesion.component';

describe('LinkCerrarSesionComponent', () => {
  let component: LinkCerrarSesionComponent;
  let fixture: ComponentFixture<LinkCerrarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkCerrarSesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkCerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
