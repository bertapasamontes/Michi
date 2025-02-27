import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MichiBotComponent } from './michi-bot.component';

describe('MichiBotComponent', () => {
  let component: MichiBotComponent;
  let fixture: ComponentFixture<MichiBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MichiBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MichiBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
