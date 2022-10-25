import { Component, OnInit } from '@angular/core';
import { BasicAccount } from 'app/models/basic.account.model';
import { Job } from 'app/models/job.model';
import { AccountService } from 'app/_services/account.service';
import { JobsService } from 'app/_services/jobs.service';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrls: ['./view-job-details.component.css']
})
export class ViewJobDetailsComponent implements OnInit {
  currentJob:any;
  currentCreator:BasicAccount;
  loading:boolean
  routing:string;
  bidExists:boolean;
  bidSuccess:boolean;
  jobAvailable:boolean;

  constructor(private accountService: AccountService,private jobsService:JobsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.currentJob = history.state.data;
    this.routing = history.state.previous;
    console.log(this.currentJob);
    this.getCreator(this.currentJob.creator);
    this.bidExists = false; 
    this.bidSuccess = false;
    this.jobAvailable =this.currentJob.jobAvailable;


  }


  getCreator(id){
    this.accountService.getJobCreatorById(id)
    .pipe(first())
    .subscribe({
        next: data => {
            // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           console.log(data)

           this.currentCreator = data;
           this.loading = false;
        },
        error: error => {
          console.log(error)
        }
    });
  }

  applyToJob(){
    
    var jobID = this.currentJob._id;
    var userID = this.accountService.accountValue.id;

    console.log(jobID,userID);

    this.jobsService.bidOnJob(jobID,userID)
    .pipe(first())
    .subscribe({
        next: data => {
            // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           console.log(data)
           this.bidSuccess = true;


        },
        error: error => {
          console.log(error)

          if(error == 'User Already Has a Bid'){
            this.bidExists = true;
          }
        }
    });
  }
  

  
};


