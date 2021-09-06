import { createReducer, on } from '@ngrx/store';
import { Messages, State } from '../messages';
import { retrieveMessagesSuccess, setMessages } from './messages.actions';

// const initialState: Messages[] = [];
const initialState: State = {
  chats: []
};

const _messageReducer = createReducer(
  initialState,

  on(retrieveMessagesSuccess, (state, chats) => {
    console.log('Data in reducer', state, chats);
    return { ...state, ...chats };
  }),

  on(setMessages, (state, action) => {
    let messageDetails = JSON.parse(JSON.stringify(state.chats));
    messageDetails = messageDetails.map(contact => {
      if (contact.id == action.enteredMessages.id) {
        contact.content = [...contact.content, action.enteredMessages.content];
      }
      return contact;
    });
    return {
      chats: messageDetails
    };
  })
);

export function messageReducer(state, action) {
  return _messageReducer(state, action);
}
