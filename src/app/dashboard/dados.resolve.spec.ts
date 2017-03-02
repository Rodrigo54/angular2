import { TestBed, async, inject } from '@angular/core/testing';

import { DadosResolve } from './dados.resolve';

describe('DadosResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosResolve]
    });
  });

  it('should ...', inject([DadosResolve], (guard: DadosResolve) => {
    expect(guard).toBeTruthy();
  }));
});
