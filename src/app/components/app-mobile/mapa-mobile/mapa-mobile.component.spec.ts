import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMobileComponent } from './mapa-mobile.component';

describe('MapaMobileComponent', () => {
  let component: MapaMobileComponent;
  let fixture: ComponentFixture<MapaMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
