import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobsComponent } from './create-jobs.component';

describe('CreateJobsComponent', () => {
  let component: CreateJobsComponent;
  let fixture: ComponentFixture<CreateJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
