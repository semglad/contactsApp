import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contacts';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;

  constructor(private contactService: ContactService) {
    this.contacts = [];
    this.contact = new Contact();
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();
  }

  submitContact(cancel: boolean, contact?: Contact) {
    if (!cancel) {
      if (contact) {
        this.contactService.saveContact(Object.assign({}, contact));
      } else {
        this.contactService.saveContact(Object.assign({}, this.contact));
      }
    }
    this.contact = new Contact();
    this.contacts = this.contactService.findContacts();
  }

  onContactDelete(contact: Contact) {
    this.contactService.deleteContact(contact.id);
    this.contacts = this.contactService.findContacts();
  }
}
