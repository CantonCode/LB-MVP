import { Component, HostListener, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Job } from 'app/models/job.model';
import { AccountService } from 'app/_services/account.service';

@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.css']
})
export class CreateJobsComponent implements OnInit {
  account = this.accountService.accountValue;
  slides = ['welcome','name','description','category','time','location','contact','confirm'];
  currentSlide = 'welcome';
  currCard = this.slides[0];
  finalJob:Job;
  jobCat1:string;
  jobCat2:string;
  jobCat2List = [];
  jobName:string;
  jobDescription:string;
  jobDate:Date;
  jobTime:number;
  jobNumber:string;
  jobLocationTown:string;
  jobLocationCounty:string;
  jobLocationCountry:string;
  jobLocationFull:string;
  completed:boolean;
  loading:boolean;
  
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient,private accountService: AccountService) { }

  public getScreenWidth: any;
  public getScreenHeight: any;

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
      this.jobTime = 1;
      
      this.loading = false;

      console.log(this.account);

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  jobCat1Change(category){
    console.log(category);
    this.jobCat2List = []

    switch (category) {
      case "Construction":
          this.jobCat2List = ["Painting","Carpentry","Roofing","Plumbing"];
        break;
      
      case "Land":
          this.jobCat2List = ["Mowing","Digging","Weeding"];
        break;

      case "Cleaning":
          this.jobCat2List = ["House","Factory"];
        break
    
    }
  }

  next(){
    var valid = this.validate(this.currCard);
    
    if(valid){
      console.log(this.currCard)
      var currIndex = this.slides.indexOf(this.currCard);
      if(currIndex == this.slides.length-1){
       console.log("Last Card");
       
       this.currentSlide = "confirm";
       this.currCard = "confirm";
      }else{
       var nextIndex = currIndex + 1;
       this.currCard = this.slides[nextIndex];
       console.log( this.currCard);

       this.currentSlide = this.currCard;
      }
    }else{
      
    }
  }

  back(){
    
    console.log(this.currCard)
     var currIndex = this.slides.indexOf(this.currCard);
     
     if(currIndex == 0){
      console.log("Last Card")
     }else{
      var nextIndex = currIndex - 1;
      this.currCard = this.slides[nextIndex];
      console.log(this.currCard);

      this.currentSlide = this.currCard;
     }
 }

 validate(card){

  console.log("CURRENTT CARD IS:",card)
  switch (card) {
    case 'name':
        console.log(this.jobName);
        if(this.jobName == undefined ||  this.onlySpaces(this.jobName)){
          console.log("INVALID");
          return false;
        }
      break;

      case 'description':
        console.log(this.jobDescription);
        if(this.jobDescription == undefined ||  this.onlySpaces(this.jobDescription)){
          console.log("INVALID");
          return false;
        }
      break;

      case 'category':
        console.log(this.jobCat2);
        if(this.jobCat2 == undefined){
          console.log("INVALID");
          return false;
        }
      break;
      
      case 'time':
        console.log(this.jobTime);
        if(this.jobTime == undefined){
          console.log("INVALID");
          return false;
        }

        if(this.jobTime < 0){
          console.log("INVALID");
          return false;
        }
      break;

      case 'location':
        console.log(this.jobLocationTown);
        if(this.jobLocationTown == undefined){
          console.log("INVALID");
          return false;
        }

        console.log(this.jobLocationCountry);
        if(this.jobLocationCountry == undefined){
          console.log("INVALID");
          return false;
        }

        console.log(this.jobLocationCounty);
        if(this.jobLocationCounty == undefined){
          console.log("INVALID");
          return false;
        }

        this.jobLocationFull = this.jobLocationTown +", " + this.jobLocationCounty + ", " + this.jobLocationCountry;

        
      break;

      case 'contact':
        console.log(this.jobNumber);
        if(this.jobNumber == undefined){
          console.log("INVALID");
          return false;
        }

        if(this.jobNumber.length != 8){
          console.log("INVALID");
          return false;
        }


        
      break;
       
    
  }

  return true;
}

submitJob(){

  var jobCreator = this.account.id

  this.loading=true;

  this.finalJob = new Job(this.jobName,this.jobDescription,[this.jobCat1,this.jobCat2],'https://media.istockphoto.com/photos/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-picture-id1211174464?k=20&m=1211174464&s=612x612&w=0&h=fQ3ahmaJnYcZb0UQtBXvOhcuhHFTgK9BA5Mylic7Gnw=',
  this.jobTime,300,this.jobLocationFull,Number(this.jobNumber),jobCreator,[],true);

  console.log(this.finalJob);
  
  this.http.post<Job>('https://shrouded-reef-89389.herokuapp.com/api/jobs/', this.finalJob,{observe: 'response'}).subscribe({

        next: response => {
           console.log(response);

           if(response.status == 200){
            this.currentSlide = 'published'
            this.loading = false;
           }
        },
        
        error: error => {
            console.error('There was an error!', error);
        }
    })
}

begin(){
  this.currCard = this.slides[1];
  this.currentSlide = this.currCard;
}

onlySpaces(str) {
  return /^\s*$/.test(str);
}

}
