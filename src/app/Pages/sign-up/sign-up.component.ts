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
  
  loading = false;
  submitted = false;
  duplicateEmail = true;
  userType = "none";
  formSelection = "basicDetails";

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

 

}
