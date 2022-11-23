import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  id:any;
  user:Worker;
  loading:boolean;
  constructor(private route: ActivatedRoute,private accountService: AccountService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.getUserDetails(this.id);
    
  }
  getUserDetails(id) {
    this.accountService.getWorkerById(id)
    .pipe(first())
    .subscribe({
        next: data => {
;
           console.log("THIS IS THE USER PROFILE DATA",data)
        },
        error: error => {
          console.log(error)
        }
    })
  }

}
