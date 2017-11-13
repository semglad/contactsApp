import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts-app';
  navbarVisible: boolean;

  constructor (private router: Router) {
    this.navbarVisible = false;
  }

  showAddUser () {
    this.router.navigate(['/edit-view-contact', true]);
  }

  showListUsers () {
    this.router.navigate(['/contacts']);
  }

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
  }
}

