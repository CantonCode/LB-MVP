import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //imports
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'app/_helpers/must-match.validator';
import { AccountService } from 'app/_services/account.service';
import { AlertService } from 'app/_services/alert.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  generalForm:FormGroup;
  generalFormValid:boolean;
  homeForm2:FormGroup;
  workerForm2:FormGroup;
  selectedCounty:any;
  selectedCountyTowns:Array<string>;
  selectedTown:string;
  selectedServices:any;

  loading = false;
  submitted = false;
  duplicateEmail = true;
  userType = "none";
  formSelection = "basicDetails";
  usercreated = false;

  services = ["plumbing","building","Painting","HELPIng","test2","test23"]
  address = [{county:"Sligo",
           towns:["Achonry","Aclare","Ballaghnatrillick","Ballinafad","Ballincar","Ballintogher","Ballygawley","Ballymote","Ballynacarrow","Ballysadare","Bellaghy","Beltra","Bunnanadden","Carney","Castlebaldwin","Charlestown-Bellahy","Cliffoney","Cloonacool","Collooney","Coolaney","Dromore West","Drumcliff","Easky","Enniscrone","Geevagh","Gorteen","Grange","Kilglass","Knocknahur","Monasteraden","Mullaghmore, County Sligo","Owenbeg","Rathcormack","Riverstown","Rosses Point","Skreen","Sligo","Sooey","Strandhill","Toorlestraun","Tubbercurry"]
          },
        {county:"Roscommon",
      towns:["Roscommon","Arigna","Athleague","Ballaghaderreen","Ballinameen","Ballinlough","Ballintober","Ballyfarnon","Ballyforan","Bellanagare","Bellanamullia","Boyle","Brideswell","Castleplunket","Castlerea","Cloonbonniffe","Cloonfad","Cloontuskert","Cootehall","Cornafulla","Croghan","Curraghboy","Dysart","Elphin","Four Roads","Frenchpark","Fuerty","Keadue","Kilteevan","Knockcroghery","Knockvicar","Lecarrow","Lisacul","Loughglinn","Monksland","Old Town","Rahara","Roosky","Roscommon","Strokestown","Taghmaconnell","Tarmonbarry"]}]

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [true, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')

    });

    this.homeForm2 = this.formBuilder.group({
      phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      county:['',Validators.required],
      town:['',Validators.required],
      eircode: ['', [Validators.required,Validators.minLength(7), Validators.maxLength(7)]]
    });

    this.workerForm2 = this.formBuilder.group({
      phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      businessName:['',Validators.required],
      services:['',Validators.required],
      county:['',Validators.required],
      town:['',Validators.required],
      eircode: ['', [Validators.required,Validators.minLength(7), Validators.maxLength(7)]]
    });
}
get f() { return this.generalForm.controls; }
get f2() { return this.homeForm2.controls; }
get f4() { return this.workerForm2.controls; }

selectUser(type){
  this.userType = type;
}

selectForm(type){
  this.generalFormValid = false;
  if(type == "personalDetailsHome"){
    //check to see if form is valid before moving on
    this.submitted = true;
    if (this.generalForm.invalid) {
      return;
    }else{
      this.generalForm.controls.email.setErrors({'duplicate': false});
      this.formSelection= type;
      this.loading = false;
      this.submitted = false;
      this.generalFormValid = true;
    }
  }

  if(type == "personalDetailsWorker"){
    //check to see if form is valid before moving on
    this.submitted = true;
    if (this.generalForm.invalid) {
      return;
    }else{
      this.generalForm.controls.email.setErrors({'duplicate': false});
      this.formSelection= type;
      this.loading = false;
      this.submitted = false;
      this.generalFormValid = true;
    }
  }
  // }else{
  //   this.formSelection = type;
  //   this.loading = false;
  //   this.submitted = false;
  // }
}



onSubmit(signupDetails) {
    if(!this.generalFormValid){
      return;
    }

    console.log("SUBMITTING",signupDetails);
    this.loading = true;

    // console.log("SUBMITTING",this.generalForm);
    // this.submitted = true;

    // this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
    

    // // reset alerts on submit
    // // this.alertService.clear();

    // // stop here if form is invalid
    // if (this.generalForm.invalid) {
    //     return;
    // }

    // this.loading = true;
    // this.generalForm.controls.email.setErrors({'duplicate': false});
    this.accountService.register(signupDetails)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                console.log("USER REGISTERED");
                this.usercreated = true;
                setTimeout(() => {
                  this.router.navigate(['../login'], { relativeTo: this.route });
              }, 2000);
                
                
            },
            error: error => {
                if(error == "User Already Registered"){
                  this.duplicateEmail = true;
                  
                  this.generalForm.controls.email.setErrors({'duplicate': true});
                }
                console.log("ERROR",error)
                this.loading = false;
            }
        });
}

countySelected(){
  console.log(this.selectedCounty)
  this.selectedCountyTowns = this.selectedCounty.towns
  
}

serviceSelected(){
  
}

registerAsHome(){
  this.submitted = true;

  this.homeForm2.value.county = this.selectedCounty.county

  if (this.homeForm2.invalid) {
    console.log("INVALID")
    console.log(this.homeForm2.invalid)
    return;
  }else{
    let signupDetails = {
      ...this.generalForm.value,
      phoneNumber:this.homeForm2.value.phoneNumber,
      address:this.homeForm2.value.town + "," + this.homeForm2.value.county + "," + this.homeForm2.value.eircode,
      role:'Homeowner'
    }

    this.onSubmit(signupDetails)
  }
}

registerAsBusiness(){
  this.submitted = true;

  this.workerForm2.value.county = this.selectedCounty.county

  if (this.workerForm2.invalid) {
    console.log("INVALID")
    console.log(this.workerForm2.invalid)
    return;
  }else{
    let signupDetails = {
      ...this.generalForm.value,
      businessName:this.workerForm2.value.businessName,
      phoneNumber:this.workerForm2.value.phoneNumber,
      address:this.workerForm2.value.town + "," + this.workerForm2.value.county + "," + this.workerForm2.value.eircode,
      services:this.workerForm2.value.services,
      role:'Worker'
    }

    
    this.onSubmit(signupDetails);
  }
}

redirectToLogin(){
  
}

 

}
