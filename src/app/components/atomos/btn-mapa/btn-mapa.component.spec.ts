import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMapaComponent } from './btn-mapa.component';

describe('BtnMapaComponent', () => {
  let component: BtnMapaComponent;
  let fixture: ComponentFixture<BtnMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
