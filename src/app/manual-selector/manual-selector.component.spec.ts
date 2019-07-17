import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSelectorComponent } from './manual-selector.component';

describe('ManualSelectorComponent', () => {
  let component: ManualSelectorComponent;
  let fixture: ComponentFixture<ManualSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
