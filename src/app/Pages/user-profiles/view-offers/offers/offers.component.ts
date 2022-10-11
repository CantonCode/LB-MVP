import { Component, OnInit } from '@angular/core';
import { Job } from 'app/models/job.model';
import { JobsService } from 'app/_services/jobs.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  loading:boolean
  JobID:string;
  currentJob:Job;
  bids:Array<any>;
  bidlength:number;
  jobHasAcceptedBid:boolean


  constructor(private jobsService:JobsService) { }

  async ngOnInit(): Promise<void> {
    this.JobID = history.state.data._id;
    this.currentJob = history.state.data;
    this.loading = true;

    console.log(this.JobID)
    var bids = await this.getJobBids(this.JobID);
   
  }
 
  async getJobBids(id){
    this.jobsService.getJobByIDWithBids(id)
    .pipe(first())
    .subscribe({
        next: data => {
            // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           
          this.bids = data.bids;
          this.bidlength = this.bids.length;
          console.log("BIDS:",this.bids)
          this.loading = false;

          this.checkIfBidAccpeted(this.bids);
        },
        error: error => {
          console.log(error)
        }
    });
  }

  offerClicked(result,bid){
    console.log(result);
    console.log(bid);

    var selectedBid = bid;
    
    selectedBid.accepted = true;

    console.log(selectedBid);

  }

  checkIfBidAccpeted(bids){
    console.log(bids)
    bids.forEach(bid => {
      
      if(bid.accepted){
        console.log("Accpeted")
      }
    });
  }
}
