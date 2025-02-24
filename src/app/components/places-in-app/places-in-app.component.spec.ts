import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesInAppComponent } from './places-in-app.component';

describe('PlacesInAppComponent', () => {
  let component: PlacesInAppComponent;
  let fixture: ComponentFixture<PlacesInAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesInAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesInAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
