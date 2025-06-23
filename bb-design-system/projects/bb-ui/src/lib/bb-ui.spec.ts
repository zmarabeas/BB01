import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbUi } from './bb-ui';

describe('BbUi', () => {
  let component: BbUi;
  let fixture: ComponentFixture<BbUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BbUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
