import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPerfilComponent } from './btn-perfil.component';

describe('BtnPerfilComponent', () => {
  let component: BtnPerfilComponent;
  let fixture: ComponentFixture<BtnPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
