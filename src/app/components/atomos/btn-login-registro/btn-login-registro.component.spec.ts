import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLoginRegistroComponent } from './btn-login-registro.component';

describe('BtnLoginRegistroComponent', () => {
  let component: BtnLoginRegistroComponent;
  let fixture: ComponentFixture<BtnLoginRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLoginRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnLoginRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
