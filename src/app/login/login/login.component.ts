import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginName: string;
  loginPassword: string;
  loginInvalid: boolean;
  @Output() userLoggedIn: EventEmitter<boolean>;

  constructor() {
    this.loginName = '';
    this.loginPassword = '';
    this.userLoggedIn = new EventEmitter();
    this.loginInvalid = false;
  }

  ngOnInit() {
  }

  checkForEmptyFields() {
    return !(this.loginName && this.loginPassword);
  }

  submitLogin(cancel: boolean) {
    this.loginInvalid = false;
    if (!cancel) {
      if (this.loginName === 'Sem' && this.loginPassword === 'Glad') {
        this.userLoggedIn.emit(!cancel);
      } else {
        this.loginInvalid = true;
        this.loginName = '';
        this.loginPassword = '';
      }
    } else {
      this.userLoggedIn.emit(cancel);
    }
  }
}
