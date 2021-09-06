import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  enteredMessage: any[] = [];
  getmsgData: any[] = [];
  getmsgData$: Observable<Messages[]>;
  newStoreMessage: any;

  constructor(
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ enteredMessage: EnteredMessage }>
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.sendMessagesForm = new FormGroup({
      messageInput: new FormControl()
    });
    this.getmsgData$ = this.messagesService.getMessages();
    this.getmsgData$.subscribe(data => console.log(data));

    this.store.select('enteredMessage').subscribe(data => {
      console.log('In messages comp', data);
      this.newStoreMessage = data;
      // console.log('In comp 1', (this.contacts));
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
    console.log('entered msg', enteredMessage);
    this.store.dispatch(setMessages({ enteredMessages: enteredMessage }));
    // this.messagesService.setMessage(enteredMessage);
    this.sendMessagesForm.reset();
  }
}
