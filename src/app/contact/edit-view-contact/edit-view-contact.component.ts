import { Component, OnInit } from '@angular/core';
import {Contact} from '../contacts';
import {ContactService} from '../services/contact.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'ca-add-contact',
  templateUrl: './edit-view-contact.component.html',
  styleUrls: ['./edit-view.css']
})
export class AddContactComponent implements OnInit {

  contact: Contact;
  contacts: Contact[];
  isEdited: boolean;
  isNew: boolean;
  inputValid: boolean;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
    this.contacts = [];
    this.contact = new Contact();
    this.isEdited = true;
    this.isNew = false;
    this.inputValid = true;
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();
    const contactId = Number(this.route.snapshot.paramMap.get('id'));
    if (contactId !== 0) {
      this.contact = _.find(this.contacts, {id: contactId});
    }

    if (this.route.snapshot.paramMap.get('edit')) {
      this.isEdited = JSON.parse(this.route.snapshot.paramMap.get('edit').toLowerCase());
    }

    if (this.route.snapshot.paramMap.get('new')) {
      this.isNew = JSON.parse(this.route.snapshot.paramMap.get('new').toLowerCase());
    }
  }

  checkValidity (contact: Contact) {
    if (contact.firstName && contact.lastName && contact.phone && contact.streetAddress && contact.city) {
      return true;
    }
    return false;
  }

  submitContact(cancel: Boolean, contact?: Contact, toList?: Boolean) {

    this.inputValid = this.checkValidity(this.contact);

    if (!cancel) {
      if (contact) {
        if (this.inputValid) {
          this.contactService.saveContact(Object.assign({}, contact));
          this.isEdited = false;
        }
      } else {
        if (this.inputValid) {
          this.contactService.saveContact(Object.assign({}, this.contact));
          this.isEdited = false;
        }
      }
    } else {
      if (!toList && !this.isNew) {
        this.router.navigate(['/contacts', this.contact.id, false]);
      } else {
        this.router.navigate(['/contacts']);
      }

      this.isEdited = false;
    }
  }

  editContact() {
    this.isEdited = true;
  }
}
