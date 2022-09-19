import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    console.log(this.account.id);
    this.accountService.getById(this.account.id)
    .pipe(first())
    .subscribe({
        next: data => {
            // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           console.log(data)
        },
        error: error => {
          console.log(error)
        }
    });
  }

  logout(){
    this.accountService.logout();
  }

}
