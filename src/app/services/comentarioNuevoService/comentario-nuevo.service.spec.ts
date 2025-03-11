import { TestBed } from '@angular/core/testing';

import { ComentarioNuevoService } from './comentario-nuevo.service';

describe('ComentarioNuevoService', () => {
  let service: ComentarioNuevoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioNuevoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
