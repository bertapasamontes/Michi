import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductoViewComponent } from './info-producto-view.component';

describe('InfoProductoComponent', () => {
  let component: InfoProductoViewComponent;
  let fixture: ComponentFixture<InfoProductoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProductoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProductoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
