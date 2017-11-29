import { Injectable } from '@angular/core';
import {ContactLocalStorageService} from './contact-local-storage.service';
import {Contact} from '../contacts';
import {ContactHttpService} from './contact-http.service';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ContactService {

  private contacts: Contact[];

  constructor(private localStorage: ContactLocalStorageService, private contactHttpService: ContactHttpService) {
    this.contacts = [];
  }

  findContacts(): Observable<Contact[]> {
//    return this.localStorage.findContacts();
    return this.contactHttpService.get().map((contacts) => {
      if (contacts) {
        this.contacts = contacts;
        return contacts;
      }

      return this.contacts;
    });
  }

  findContactById (id: number) {

    let cachedContact = null;
    let errorCounter = 0;

    while (!cachedContact) {
      cachedContact = _.find(this.contacts, {'id': id});

      if (!cachedContact) {
        this.findContacts();
      }

      if (errorCounter > 3 || cachedContact) {
        break;
      }

      errorCounter++;
    }
      return cachedContact;
//    return this.localStorage.findContactById(id);
  }

  saveContact (contact: Contact) {
    this.contactHttpService.create(contact);
//    this.localStorage.saveContact(contact);
  }

  deleteContact (id: number): Observable<boolean> {
    return this.contactHttpService.del(id).map((result) => {
      return true;
    });
//    this.localStorage.deleteContact(id);
  }
}
