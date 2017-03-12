import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTabelaComponent } from './md-tabela.component';

describe('MdTabelaComponent', () => {
  let component: MdTabelaComponent;
  let fixture: ComponentFixture<MdTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
