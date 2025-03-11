import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioNuevoComponent } from './comentario-nuevo.component';

describe('ComentarioNuevoComponent', () => {
  let component: ComentarioNuevoComponent;
  let fixture: ComponentFixture<ComentarioNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
