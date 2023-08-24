import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { CommonHttpService } from 'src/app/shared/services/common-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  userSub!: Subscription;
  userData!: User;

  constructor(private commonHttp: CommonHttpService, private authService: AuthService, private router: Router) {}

  handleSave() {
    this.commonHttp.saveRecipeData().subscribe((response) => {
      if(response) {
        this.commonHttp.isSaveSuccessfully.next(true);
      }
    }, error => {
      this.commonHttp.isSaveSuccessfully.next(false);
    })
  }

  fetchRecipeData() {
    this.commonHttp.fetchRecipeData().subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((userData) => {
      if(userData) {
        this.fetchRecipeData();
        this.isUserLoggedIn = true;
        this.userData = userData;
      } else {
        this.isUserLoggedIn = false;
      }
    })
  }

  handleLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
