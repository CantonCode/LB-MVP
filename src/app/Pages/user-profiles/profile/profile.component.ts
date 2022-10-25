import { Component, OnInit } from '@angular/core';
import { Job } from 'app/models/job.model';
import { AccountService } from 'app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading:boolean;
  account = this.accountService.accountValue;
  usersJobs:Job;
  yourJobs:boolean;
  yourProfile:boolean;
  dateJoined:string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loading = false;
    this.getUserJobs();
    this.yourJobs = false;
    this.yourProfile = true;

    console.log(this.account)

    let date = new Date(this.account.created);

    var day = date.getDay().toString();
    var month = date.toLocaleString('default', { month: 'short' });
    var year = date.getFullYear().toString()

    console.log(day,month,year);

    this.dateJoined = day+" "+month+" "+year;

    
  
  }

  getUserJobs(){
    this.accountService.getUsersPostsById(this.account.id)
    .pipe(first())
    .subscribe({
        next: data => {
          this.usersJobs = data;
            // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           console.log("Users Posts",this.usersJobs)
        },
        error: error => {
          console.log(error)
        }
    });
  }

  showJobs(){
    this.yourJobs = !this.yourJobs;
    this. yourProfile = !this. yourProfile;


  }

  

}
