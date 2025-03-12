import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFavComponent } from './producto-fav.component';

describe('ProductoFavComponent', () => {
  let component: ProductoFavComponent;
  let fixture: ComponentFixture<ProductoFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoFavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
