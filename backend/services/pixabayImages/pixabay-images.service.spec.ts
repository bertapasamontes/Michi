import { TestBed } from '@angular/core/testing';

import { PixabayImagesService } from './pixabay-images.service';

describe('PixabayImagesService', () => {
  let service: PixabayImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixabayImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
