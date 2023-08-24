import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginForm: boolean = true;
  isLoading: boolean = false;
  errorMsg: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;

    let authObs!: Observable<AuthResponseData>;

    if (this.isLoginForm) {
      authObs = this.authService.signIn(authForm.form.value)
    } else {
      authObs = this.authService.signUp(authForm.value)
    }

    authObs.subscribe({
      complete: () => {
        this.isLoading = false;
        if(this.isLoginForm) {
          this.router.navigate(['/recipes']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = error;
      }
    });

    authForm.reset();
  }

  switchButton() {
    this.isLoginForm = !this.isLoginForm;
  }
}
