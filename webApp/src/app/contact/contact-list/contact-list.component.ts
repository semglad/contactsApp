import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Contact} from '../contacts';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;
  isSmallScreen: boolean;
  isProcessing: boolean;
  @Output() emitIsSmallScreen: EventEmitter<boolean>;

  constructor(private contactService: ContactService, private router: Router, private breakpointObserver: BreakpointObserver) {
    this.contacts = [];
//    this.contact = new Contact();
    this.isSmallScreen = false;
    this.emitIsSmallScreen = new EventEmitter();
  }

  ngOnInit() {
//    this.contacts = this.contactService.findContacts();

    this.breakpointObserver.observe([
      '(max-width: 299px)'
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
      this.emitIsSmallScreen.emit(this.isSmallScreen);
    });
    this.isProcessing = true;
    this.getContacts();
  }

  getContacts() {
    this.contactService.findContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.isProcessing = false;
    });
  }

  submitContact(cancel: boolean, contact?: Contact) {
    if (!cancel) {
//      if (contact) {
        this.contactService.saveContact(Object.assign({}, contact));
//      } else {
//        this.contactService.saveContact(Object.assign({}, this.contact));
//      }
    }
//    this.contact = new Contact();
    this.getContacts();
  }

  onContactDelete(contact: Contact) {
    this.contactService.deleteContact(contact.id).subscribe(() => {}, () => {},
      () => {
      this.getContacts();
    });
  }

  addContact() {
    this.router.navigate(['/edit-view-contact', true]);
  }
}
