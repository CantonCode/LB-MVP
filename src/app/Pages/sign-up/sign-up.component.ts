import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //imports
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'app/_helpers/must-match.validator';
import { AccountService } from 'app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  loading = false;
  submitted = false;
  duplicateEmail = true;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
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
}

get f() { return this.form.controls; }

onSubmit() {
    console.log("SUBMITTING",this.form);
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.form.controls.email.setErrors({'duplicate': false});
    this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                console.log("USER REGISTERED")
                this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {
                if(error.error.message == "User Already Registered"){
                  this.duplicateEmail = true;
                  this.form.controls.email.setErrors({'duplicate': true});
                }
                console.log("ERROR",error.error.message)
                this.loading = false;
            }
        });
}

 

}
