import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VplayerComponent } from './vplayer.component';

describe('VplayerComponent', () => {
  let component: VplayerComponent;
  let fixture: ComponentFixture<VplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
