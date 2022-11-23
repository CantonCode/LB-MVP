import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-findworker',
  templateUrl: './findworker.component.html',
  styleUrls: ['./findworker.component.css']
})
export class FindworkerComponent implements OnInit {

  AllWorkers:Array<Worker>;
  loading:boolean;
  workersSize:any;

  constructor(private accountService: AccountService,private router:Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.getAllWorkers();
  }

  getAllWorkers(){
    this.accountService.getAllWorkers()
    .pipe(first())
    .subscribe({
        next: data => {
            // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           console.log(data)
           this.AllWorkers = data;
           this.workersSize = data.length;
           this.loading = false;      
        },
        error: error => {
          console.log(error)
        }
    });
  }

  routeToPublicProfile(id){
    console.log("USER ID IS:",id);
    this.router.navigate(['public-profile',id]);
  }

}
