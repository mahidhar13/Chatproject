import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Messages } from './messages';
import { retrieveMessagesSuccess } from './store/messages.actions';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  storeMessages$: BehaviorSubject<any> = new BehaviorSubject([]);
  getStoreMessage: any;
  urlMessages: any;
  messageList: any;
  retrieveMessages: any;
  updatedMessage: any[] = [];

  // setData(data: any) {
  //   this.storeMessages$ = data;
  // }

  url =
    'https://raw.githubusercontent.com/NablaT/test-api/master/assets/messages.json.txt';
  constructor(private http: HttpClient, private store: Store<Messages[]>) {
    this.getContacts();
  }

  // getMessages() {
  //   this.getStoreMessage = JSON.parse(localStorage.getItem('All message'));
  //   if (this.getStoreMessage) {
  //     this.storeMessages$.next(this.getStoreMessage);
  //   } else {
  //     this.storeMessages$.next(this.getStoreMessage);
  //     this.http
  //       .get<Messages[]>(this.url)
  //       .subscribe(data => this.storeMessages$.next(data));
  //   }
  //   return this.storeMessages$;
  // }
  getContacts() {
    this.http.get<Messages[]>(this.url).subscribe(data => {
      this.retrieveMessages = data;
      console.log('Data coming from service', this.retrieveMessages);
      this.store.dispatch(
        retrieveMessagesSuccess({ chats: this.retrieveMessages })
      );
    });
  }
  // setMessage(message: any) {
  //   const currentMessage = this.storeMessages$.value;
  //   this.updatedMessage = [...currentMessage, message];
  //   this.messageList = this.storeMessages$.next(this.updatedMessage);
  //   localStorage.setItem('All message', JSON.stringify(this.updatedMessage));
  // }
}
