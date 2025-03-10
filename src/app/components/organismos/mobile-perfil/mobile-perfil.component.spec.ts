import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePerfilComponent } from './mobile-perfil.component';

describe('MobilePerfilComponent', () => {
  let component: MobilePerfilComponent;
  let fixture: ComponentFixture<MobilePerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
