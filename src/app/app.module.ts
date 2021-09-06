import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { messageReducer } from './store/messages.reducer';
import { messageListReducer } from './store/messagesList.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { messageEffects } from './store/messages.effects';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      chats: messageReducer,
      enteredMessages: messageListReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ContactsComponent },
      { path: 'messages/:id', component: MessagesComponent }
    ])
    // EffectsModule.forRoot([messageEffects])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ContactsComponent,
    MessagesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
