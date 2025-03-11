import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnClipboardComponent } from './btn-clipboard.component';

describe('BtnClipboardComponent', () => {
  let component: BtnClipboardComponent;
  let fixture: ComponentFixture<BtnClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnClipboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
