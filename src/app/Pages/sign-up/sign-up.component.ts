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
  homeForm2:FormGroup;
  workerForm2:FormGroup;
  selectedCounty:any;
  selectedCountyTowns:Array<string>;
  selectedTown:string;
  loading = false;
  submitted = false;
  duplicateEmail = true;
  userType = "none";
  formSelection = "basicDetails";

  counties = ["Sligo","Leitrim","Mayo","Roscommon"]
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
      businessName:['',Validators.required]
    });
}
get f() { return this.generalForm.controls; }
get f2() { return this.homeForm2.controls; }
get f4() { return this.workerForm2.controls; }

selectUser(type){
  this.userType = type;
}

selectForm(type){
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
    }
  }else{
    this.formSelection = type;
    this.loading = false;
    this.submitted = false;
  }
}



onSubmit() {
    console.log("SUBMITTING",this.generalForm);
    this.submitted = true;

    this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
    

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.generalForm.invalid) {
        return;
    }

    this.loading = true;
    this.generalForm.controls.email.setErrors({'duplicate': false});
    this.accountService.register(this.generalForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                console.log("USER REGISTERED")
                this.router.navigate(['../login'], { relativeTo: this.route });
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

registerAsHome(){
  this.submitted = true;

  console.log(this.generalForm.value);
  console.log(this.homeForm2.value);

  if (this.generalForm.invalid || this.homeForm2.invalid) {
    return;
  }
}

 

}
