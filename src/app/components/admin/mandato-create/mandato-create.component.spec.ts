import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatoCreateComponent } from './mandato-create.component';

describe('MandatoCreateComponent', () => {
  let component: MandatoCreateComponent;
  let fixture: ComponentFixture<MandatoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
