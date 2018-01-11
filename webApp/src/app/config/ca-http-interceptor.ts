import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {MatDialog} from '@angular/material';
import {HttpMessageDialogComponent} from '../http-message-dialog/http-message-dialog.component';
import {Injectable, Injector} from '@angular/core';
import {LoginService} from '../login/services/login.service';
import {Router} from '@angular/router';

@Injectable()
export class CaHttpInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private injector: Injector, private router: Router) {}

  private static getStoredToken() {
    return JSON.parse(localStorage.getItem('caAccessToken'));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = CaHttpInterceptor.getStoredToken();

    if (token) {
      const request = req.clone({setHeaders: {Authorization: token.token_type + ' ' + token.access_token}});
      return this.handleHttpRequest(request, next);
    } else {
      return this.handleHttpRequest(req, next);
    }

  }

  private handleHttpRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((response: HttpErrorResponse) => {
      if (response instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>response).status) {
          case 401:
            if (localStorage.getItem('caAccessToken')) {
            const loginService = this.injector.get(LoginService);
              loginService.getAccessToken(null).subscribe(() => {
                this.dialog.open(HttpMessageDialogComponent, {
                  width: '400px',
                  data: 'Your session had expired but we renewed it for you. Please try again.'
                });
              }, () => {
                this.dialog.open(HttpMessageDialogComponent, {
                  width: '400px',
                  data: 'Your session expired and we were unable to renew it for you. Please login again.'
                });
                this.router.navigate(['/login']);
              });
            } else {
            this.router.navigate(['/login', true]);
            }
            break;
          default:
            this.dialog.open(HttpMessageDialogComponent, {
              width: '400px',
              data: 'Something went wrong. Please contact the administrator of the site and pass them this error code: '
              + (<HttpErrorResponse>response).status
            });
            break;
        }
      }

      return Observable.throw(response);
    });
  }
}
