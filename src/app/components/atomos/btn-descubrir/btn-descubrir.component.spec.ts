import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDescubrirComponent } from './btn-descubrir.component';

describe('BtnDescubrirComponent', () => {
  let component: BtnDescubrirComponent;
  let fixture: ComponentFixture<BtnDescubrirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnDescubrirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDescubrirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
