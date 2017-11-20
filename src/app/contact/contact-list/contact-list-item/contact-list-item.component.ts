import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../contacts';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
    this.deleteContact = new EventEmitter();
    this.toolsVisible = false;
  }

  ngOnInit() {
  }

  onDeleteContact() {
    this.deleteContact.emit(this.contact);
  }

  onUpdateContact() {
    this.router.navigate(['/contacts', this.contact.id, true]);
  }

  onContactSelect () {
    this.router.navigate(['/contacts', this.contact.id, false]);
  }
}
