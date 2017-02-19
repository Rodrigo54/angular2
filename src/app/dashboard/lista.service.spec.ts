/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListaService } from './lista.service';

describe('ListaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaService]
    });
  });

  it('should ...', inject([ListaService], (service: ListaService) => {
    expect(service).toBeTruthy();
  }));
});
