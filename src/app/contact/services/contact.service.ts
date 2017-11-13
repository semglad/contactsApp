import { Injectable } from '@angular/core';
import {Contact} from '../contacts';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Injectable()
export class ContactService {

  private contacts: Contact[];

  constructor(private router: Router) {
  }

  findContacts() {
    return JSON.parse(localStorage.getItem('caContacts'));
  }

  findContactById(id: number): Contact {
    const contacts =  JSON.parse(localStorage.getItem('caContacts'));
    return contacts[id];
  }

  saveContact(contact: Contact) {

    let contacts = this.findContacts();

    let maxId = 0;

    if (contacts) {

      for (let i = 0; i < contacts.length; i++) {

        if (contacts[i].id === contact.id) {
          contacts.splice(i, 1);
          break;
        }

        if (contacts[i].id > maxId) {
          maxId = contacts[i].id;
        }
      }
    } else {
      contacts = [];
    }

    if (!contact.id) {
      contact.id = maxId + 1;
    }

    contacts.push(contact);
    localStorage.setItem('caContacts', JSON.stringify(contacts));

    this.router.navigate(['/contacts', contact.id, false]);
  }

  deleteContact(id: number) {
    const contacts = JSON.parse(localStorage.getItem('caContacts'));

    _.remove(contacts, {'id': id});

    localStorage.setItem('caContacts', JSON.stringify((contacts)));
  }
}
