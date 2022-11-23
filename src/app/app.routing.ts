import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { ProfileComponent } from './Pages/user-profiles/profile/profile.component';
import { Signup1Component } from './Pages/signup/signup.component';
import { ViewJobsComponent } from './Pages/viewJobs/viewJobs.component';
import { ViewJobDetailsComponent } from './Pages/view-job-details/view-job-details.component';
import { CreateJobsComponent } from './Pages/create-jobs/create-jobs.component';
import { HomeComponent } from './Pages/home/home.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './_helpers/auth.gaurd';
import { OffersComponent } from './Pages/user-profiles/view-offers/offers/offers.component';
import { FindworkerComponent } from './Pages/find-worker/findworker/findworker.component';
import { PublicProfileComponent } from './Pages/user-profiles/public-profile-view/public-profile/public-profile.component';


const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'user-profile',     component: ProfileComponent,
    children:[
      {
        path: 'viewBids',
        component: OffersComponent
     },

    ]

    },
    { path: 'signup',           component: Signup1Component },
    { path: 'sign-up',           component: SignUpComponent },
    { path: 'login',           component: LoginComponent },
    { path: 'find-worker',           component: FindworkerComponent, canActivate: [AuthGuard]},
    { path: 'public-profile/:id',           component: PublicProfileComponent, canActivate: [AuthGuard]},
    
    { path: 'view-jobs',
      component: ViewJobsComponent,
      children:[
        {
          path: '',
          redirectTo: 'view-jobs',
          pathMatch: 'full'
       }
      ] },
      { path: 'view-details',     component: ViewJobDetailsComponent},
      { path:'create-job', component:CreateJobsComponent,canActivate: [AuthGuard]},
      { path: 'home',     component: HomeComponent,canActivate: [AuthGuard] },
      { path: 'viewBids',     component: OffersComponent,canActivate: [AuthGuard] },
      { path: '**',     component: HomeComponent },
    

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
