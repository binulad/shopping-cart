import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

const API_KEY = "AIzaSyD1c_MVms24lqbtKlg-R-bjynvJbgnRrpY";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new Subject<User>();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(formData: any) {
    const data = { ...formData, returnSecureToken: true };
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  signIn(formData: any) {
    const data = { ...formData, returnSecureToken: true };
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, data)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
          const userData = new User(response.email, response.localId, response.idToken, expirationDate);
          this.user.next(userData);
          // Call Auto LogOut
          // Passed the milliseconds
          this.autoLogOut(+response.expiresIn * 1000);

          localStorage.setItem("userData", JSON.stringify(userData));
        })
      );
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogIn() {
    const data: string | null = localStorage.getItem("userData");
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = data && JSON.parse(data);

    if (!userData) {
      return
    }

    
    const loggedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loggedUser.token) {
      this.user.next(loggedUser);
      
      // Call Auto LogOut
      // Passed the milliseconds
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = 'Error Occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This Email Already Exist"
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email Not Found"
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The Password is invalid"
        break;
      case "USER_DISABLED":
        errorMessage = "The User is Disabled"
        break;
    }
    return throwError(() => errorMessage);
  }
}
