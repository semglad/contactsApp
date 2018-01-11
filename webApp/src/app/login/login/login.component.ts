import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {LoginService} from '../services/login.service';
import {AccessCredentials} from '../accessCredentials';
import {AccessToken} from '../accessToken';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginName: string;
  loginPassword: string;
  loginInvalid: boolean;
  error: boolean;
  @Output() userLoggedIn: EventEmitter<boolean>;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    this.loginName = '';
    this.loginPassword = '';
    this.userLoggedIn = new EventEmitter();
    this.loginInvalid = false;
    this.error = false;
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('error')) {
      this.error = JSON.parse(this.route.snapshot.paramMap.get('error').toLowerCase());
    }
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

        this.router.navigate(['/ca/contacts']);
      }, () => {
        this.loginName = '';
        this.loginPassword = '';
      });
    } else {
      this.userLoggedIn.emit(cancel);
    }
  }
}
