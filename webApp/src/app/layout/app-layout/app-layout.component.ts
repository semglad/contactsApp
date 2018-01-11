import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../login/services/login.service';

@Component({
  selector: 'ca-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {

  title = 'contacts-app';
  navbarVisible: boolean;
  isSmallScreen: boolean;
  isLoggedIn: boolean;

  constructor (private router: Router, private loginService: LoginService) {
    this.navbarVisible = false;
    this.isSmallScreen = false;
    this.isLoggedIn = false;
  }

  showAddUser () {
    this.router.navigate(['/ca/edit-view-contact', true]);
  }

  showListUsers () {
    this.router.navigate(['/ca/contacts']);
  }

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
  }

  checkIfSmallScreen(isSmallScreen: boolean) {
    this.isSmallScreen = isSmallScreen;
    console.log('Small');
  }

  logUserInOut(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
    localStorage.removeItem('caAccessToken');
    this.router.navigate(['/login']);
  }

  refreshToken() {
    this.loginService.getAccessToken(null).subscribe(() => {
      console.log('Token refreshed');
    }, () => {
      console.log('Token refresh failed');
    }, () => {
      console.log('Token refresh attempted');
    });
  }
}
