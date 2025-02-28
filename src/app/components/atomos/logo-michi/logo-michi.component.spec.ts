import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMichiComponent } from './logo-michi.component';

describe('LogoMichiComponent', () => {
  let component: LogoMichiComponent;
  let fixture: ComponentFixture<LogoMichiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoMichiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoMichiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
