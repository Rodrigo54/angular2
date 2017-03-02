import { TestBed, inject } from '@angular/core/testing';

import { EventosService } from './eventos.service';

describe('EventosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventosService]
    });
  });

  it('should ...', inject([EventosService], (service: EventosService) => {
    expect(service).toBeTruthy();
  }));
});
