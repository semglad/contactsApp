import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../contacts';
import {Router} from '@angular/router';
import {timeout} from 'rxjs/operator/timeout';

@Component({
  selector: 'ca-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;
  @Output() deleteContact: EventEmitter<Contact>;
  toolsVisible: boolean;
  @Input() isSmallScreen: boolean;
  deleteClicked: boolean;

  constructor(private router: Router) {
    this.deleteContact = new EventEmitter();
    this.toolsVisible = false;
    this.deleteClicked = false;
  }

  ngOnInit() {
  }

  onDeleteContact(event: Event) {
    event.stopPropagation();
    this.deleteContact.emit(this.contact);
  }

  onUpdateContact() {
    this.router.navigate(['/ca/contacts', this.contact.id, true]);
  }

  onContactSelect () {
      this.router.navigate(['/ca/contacts', this.contact.id, false]);
  }
}
