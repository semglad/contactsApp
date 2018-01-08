import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {LoginService} from '../services/login.service';
import {AccessCredentials} from '../accessCredentials';
import {AccessToken} from '../accessToken';

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

  constructor(private loginService: LoginService) {
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

    const accessCredentials = new AccessCredentials(this.loginName, this.loginPassword);

    if (!cancel) {
      this.loginService.getAccessToken(accessCredentials).subscribe((accessToken: AccessToken) => {
        this.userLoggedIn.emit(!cancel);

        if (!accessToken) {
          this.loginInvalid = true;
          this.loginName = '';
          this.loginPassword = '';
        }
      });
    } else {
      this.userLoggedIn.emit(cancel);
    }
  }
}
