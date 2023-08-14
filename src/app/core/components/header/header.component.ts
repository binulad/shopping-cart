import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  // public activeMenu: string = 'recipe';
  // @Output() public onMenuChange = new EventEmitter<string>();

  // handleMenu(menuName: string) {
  //   this.activeMenu = menuName;
  //   this.onMenuChange.emit(this.activeMenu);
  // }
}
