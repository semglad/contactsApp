import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpMessageDialogComponent} from '../http-message-dialog/http-message-dialog.component';
import {HelloService} from './hello.service';
import {Injectable, Injector} from '@angular/core';

@Injectable()
export class CaHttpInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.getStoredToken();

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
            console.log('Error 401');
            this.dialog.open(HttpMessageDialogComponent, {
              width: '400px',
              data: 'Invalid username or password. Please try again.'
            });
            break;
          default:
            console.log('Error ' + (<HttpErrorResponse>response).status);
            this.dialog.open(HttpMessageDialogComponent, {
              width: '400px',
              data: 'Something went wrong. Please contact the administrator of the site.'
            });
            break;
        }
      }

      return Observable.throw(response);
    });
  }

  private getStoredToken() {
    return JSON.parse(localStorage.getItem('caAccessToken'));
  }
}
