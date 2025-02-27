import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMichiBotComponent } from './btn-michi-bot.component';

describe('BtnMichiBotComponent', () => {
  let component: BtnMichiBotComponent;
  let fixture: ComponentFixture<BtnMichiBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnMichiBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnMichiBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
