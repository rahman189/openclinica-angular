import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  returnUrl: string;
  disButton: boolean;
  loading: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    if (this.authenticationService.userValue) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.disButton = false
    this.loading = false
  }

  checkErrors(controlName: string, validator: string) {
    return this.loginForm.controls[controlName].hasError(validator);
  }
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.loading = true
    if (this.loginForm.invalid) {
      this.loading = false
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: error => {
        this._snackBar.open(error, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });    
        this.loading = false;
      }
    });

  }
  

}
