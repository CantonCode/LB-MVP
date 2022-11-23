import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ViewJobsComponent } from './viewJobs/viewJobs.component';
import { ProfileComponent } from './user-profiles/profile/profile.component'
import { Signup1Component } from './signup/signup.component';
import { ViewJobDetailsComponent } from './view-job-details/view-job-details.component';
import { RouterModule } from '@angular/router';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { OffersComponent } from './user-profiles/view-offers/offers/offers.component';
import { FindworkerComponent } from './find-worker/findworker/findworker.component';
import { PublicProfileComponent } from './user-profiles/public-profile-view/public-profile/public-profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        ViewJobsComponent,
        Signup1Component,
        ProfileComponent,
        ViewJobDetailsComponent,
        CreateJobsComponent,
        HomeComponent,
        SignUpComponent,
        LoginComponent,
        OffersComponent,
        FindworkerComponent,
        PublicProfileComponent
    ]
})
export class PagesModule { }
