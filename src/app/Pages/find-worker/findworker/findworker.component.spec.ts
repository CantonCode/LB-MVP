import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindworkerComponent } from './findworker.component';

describe('FindworkerComponent', () => {
  let component: FindworkerComponent;
  let fixture: ComponentFixture<FindworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindworkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
