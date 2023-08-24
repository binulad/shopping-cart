import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonHttpService } from './shared/services/common-http.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  showToaster: boolean = false;
  isDataSaved: boolean = false;
  toastSubscription!: Subscription;
  toastSuccessMsg: string = "Data saved successfully!";
  toastMsg: string = '';

  constructor(private commonHttp: CommonHttpService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogIn();

    this.toastSubscription = this.commonHttp.isSaveSuccessfully.subscribe((isDataSaved) => {
      if(isDataSaved) {
        this.isDataSaved = true;
        this.showToaster = true;
        this.toastMsg = this.toastSuccessMsg;
      }

      setTimeout(() => {
        this.showToaster = false;
      }, 5000);
    })
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
