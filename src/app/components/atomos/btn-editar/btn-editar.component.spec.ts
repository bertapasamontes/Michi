import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnEditarComponent } from './btn-editar.component';

describe('BtnEditarComponent', () => {
  let component: BtnEditarComponent;
  let fixture: ComponentFixture<BtnEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
