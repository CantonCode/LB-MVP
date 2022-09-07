import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //imports
import { MustMatch } from 'app/_helpers/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,) { }

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
    // this.accountService.register(this.form.value)
    //     .pipe(first())
    //     .subscribe({
    //         next: () => {
    //             this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
    //             this.router.navigate(['../login'], { relativeTo: this.route });
    //         },
    //         error: error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         }
    //     });
}

 

}
