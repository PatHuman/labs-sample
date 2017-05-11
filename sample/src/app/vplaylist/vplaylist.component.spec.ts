import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VplaylistComponent } from './vplaylist.component';

describe('VplaylistComponent', () => {
  let component: VplaylistComponent;
  let fixture: ComponentFixture<VplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
