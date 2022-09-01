import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as _ from 'lodash';
import { Job } from 'app/models/job.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-view-jobs',
    templateUrl: './viewJobs.component.html',
    styleUrls: ['./viewJobs.component.scss']
})

export class ViewJobsComponent implements OnInit {
  focus: any;
  focus1: any;
  jobs:Job[];
  joblist:Observable<Job[]>;
  jobResults:number;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get<Job[]>("https://shrouded-reef-89389.herokuapp.com/api/jobs/").subscribe((data: Job[]) => {
              this.jobs = data;
              console.log(this.jobs);
              this.jobResults = this.jobs.length;
              console.log(this.jobResults);
  })


  }
}


