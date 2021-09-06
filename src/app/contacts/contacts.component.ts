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
  contactsList = [];
  newContactList: any;

  constructor(
    private messagesService: MessagesService,
    private store: Store<{ chats: Messages }>
  ) {}

  ngOnInit() {
    // this.messagesService.getContacts();
    this.contacts$ = this.store.select('chats');
    setTimeout(() => {console.log(this.contacts$)}, 1000);
      // console.log('Contacts var in comp1', this.contacts);
      // this.contactsList.push(this.contacts);
      // console.log('after push', this.contactsList[1]);
      // this.contactsList.forEach((item: any) => {
      //   if (item) {
      //     console.log('after foreach', item);
      //   }
      // });
      // console.log('ContactList var in comp1', this.contactsList);
      // this.newContactList.push(this.contactsList[1]);
      // console.log('new contlist', this.newContactList);
    });
  }
}
