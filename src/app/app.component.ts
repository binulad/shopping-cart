import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-cart';

  public isShowRecipe: boolean = true;

  onMenuChange(activeMenu: string) {
    this.isShowRecipe = (activeMenu == 'recipe') ? true : false;
  }
}
