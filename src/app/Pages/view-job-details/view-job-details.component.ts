import { Component, OnInit } from '@angular/core';
import { Job } from 'app/models/job.model';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrls: ['./view-job-details.component.css']
})
export class ViewJobDetailsComponent implements OnInit {
  currentJob:any;

  constructor() { }

  ngOnInit(): void {
    this.currentJob = history.state.data;
    console.log(this.currentJob);
  }

  
};


