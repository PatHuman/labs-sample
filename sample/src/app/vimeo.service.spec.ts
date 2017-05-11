import { TestBed, inject } from '@angular/core/testing';

import { VimeoService } from './vimeo.service';

describe('VimeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VimeoService]
    });
  });

  it('should ...', inject([VimeoService], (service: VimeoService) => {
    expect(service).toBeTruthy();
  }));
});
