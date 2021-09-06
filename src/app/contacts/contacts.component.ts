import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Messages } from '../messages';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<Messages>;

  constructor(
    private messagesService: MessagesService,
    private store: Store<{ chats: Messages }>
  ) {}

  ngOnInit() {
    // this.messagesService.getContacts();
    this.contacts$ = this.store.select('chats');
  }
}
