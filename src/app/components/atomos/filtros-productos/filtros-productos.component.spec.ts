import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosProductosComponent } from './filtros-productos.component';

describe('FiltrosProductosComponent', () => {
  let component: FiltrosProductosComponent;
  let fixture: ComponentFixture<FiltrosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
