import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  showMenuMobile: boolean = false;

  @Input() isDarkTheme!: boolean;
  @Output() setDarkTheme = new EventEmitter();


  handleMenuMobile(){
    this.showMenuMobile = !this.showMenuMobile;
  }

  changeModeTheme(){
    let changeTheme = this.isDarkTheme = !this.isDarkTheme;
    this.setDarkTheme.emit(changeTheme);
    this.showMenuMobile = false;
  }

}
