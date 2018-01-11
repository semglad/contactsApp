import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../contacts';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';


@Injectable()
export class ContactHttpService {

  private url: string;
//  private authHeader: string;

  constructor(private http: HttpClient) {
//    this.url = 'http://localhost:50247/api/contacts'; 'http://contactswebapi20171129012221.azurewebsites.net/api/contacts';
    this.url = environment.contactsEndpointUrl;
//    this.authHeader = 'Bearer ' + JSON.parse(localStorage.getItem('caAccessToken')).access_token;
  }

  get(): Observable<Contact[]> {
    return this.http.get(this.url).map((response) => {
      return response['resultContacts'] as Contact[];
    });
  }

  create(contact: Contact) {
    this.http.delete(this.url + '/' + contact.id).subscribe();
    this.http.post(this.url, contact, { responseType: 'text' }).subscribe();
  }

  del(id: number): Observable<boolean> {
    return this.http.delete(this.url + '/' + id).map(() => {
      return true;
    });
  }
}
