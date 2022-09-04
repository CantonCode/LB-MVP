import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { ProfileComponent } from './Pages/profile/profile.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { ViewJobsComponent } from './Pages/viewJobs/viewJobs.component';
import { ViewJobDetailsComponent } from './Pages/view-job-details/view-job-details.component';
import { CreateJobsComponent } from './Pages/create-jobs/create-jobs.component';
import { HomeComponent } from './Pages/home/home.component';


const routes: Routes =[
    { path: '', redirectTo: 'view-jobs', pathMatch: 'full' },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
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
      { path:'create-job', component:CreateJobsComponent},
      { path: 'home',     component: HomeComponent },
    

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
