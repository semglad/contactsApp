import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AccessCredentials} from '../accessCredentials';
import {AccessToken} from '../accessToken';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.loginEndpointUrl;
  }

  getAccessToken(accessCredentials?: AccessCredentials): Observable<AccessToken> {
    if (accessCredentials) {
      return this.http.post(this.url, accessCredentials).map((response) => {
        localStorage.setItem('caAccessToken', JSON.stringify(response));
        return response as AccessToken;
      });
    } else {
      return JSON.parse(localStorage.getItem('caAccessToken'));
    }
  }
}
