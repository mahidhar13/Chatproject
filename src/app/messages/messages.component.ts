import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnteredMessage, Messages } from '../messages';
import { MessagesService } from '../messages.service';
import { setMessages } from '../store/messages.actions';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  id: number;
  sendMessagesForm: FormGroup;
  getmsgData$: Observable<Messages[]>;
  newStoreMessage: any;
  newMessages = [];
  urlMessages: any;

  constructor(
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ enteredMessages: EnteredMessage; chats: Messages }>
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.sendMessagesForm = new FormGroup({
      messageInput: new FormControl()
    });

    this.store.select('chats').subscribe(data => {
      console.log('Messages receiving from URL', data);
      this.urlMessages = data;
    });

    this.store.select('enteredMessages').subscribe(data => {
      console.log('Message receiving from Store to messages component', data);
      this.newStoreMessage = data;
    });
    //this.storeMessage$=this.messagesService.getMessages();
    // this.enteredMessage = JSON.parse(localStorage.getItem('All messages'));
    // if (this.enteredMessage) {
    //   this.messages = JSON.parse(localStorage.getItem('All messages'));
    //   this.messagesService.setData(this.enteredMessage);
    // } else {
    //   this.messagesService.getMessages().subscribe(data => {
    //     this.messageData = data.filter(obj => {
    //       return obj.id === this.id;
    //     });
    //     this.messagesService.setData(this.messageData);
    //   });
    // }
  }
  sendMessage() {
    let enteredMessage = {
      id: this.id,
      content: this.sendMessagesForm.value.messageInput
    };
    this.newMessages = Object.assign([], enteredMessage);
    this.newMessages.push(enteredMessage);
    console.log('Entered messages dispatching to store', this.newMessages);
    this.store.dispatch(setMessages({ enteredMessages: this.newMessages }));
    this.sendMessagesForm.reset();
  }
}
