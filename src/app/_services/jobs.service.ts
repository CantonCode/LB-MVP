import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../models/account.model';
import { BasicAccount } from 'app/models/basic.account.model';
import { Job } from 'app/models/job.model';

const baseUrl = `${environment.apiUrl}/accounts`;
const jobUrl = `${environment.apiUrl}/api/jobs`;

@Injectable({ providedIn: 'root' })
export class JobsService {
  

    constructor(
        private router: Router,
        private http: HttpClient
    ){}



    getJobByIDWithBids(id:string){
        return this.http.get<Job>(`${jobUrl}/${id}/getBids`);
    }

    bidOnJob(id:string,userID:string) {
        console.log(id),
        console.log(userID);
        return this.http.post(`${jobUrl}/${id}/sendBid`, {userID});
    }

    //changes the selected bid.accepted = true
    acceptBid(bidID:string){
        console.log(bidID)
        return this.http.patch(`${jobUrl}/${bidID}/acceptBid`,{bidID});
    }
}