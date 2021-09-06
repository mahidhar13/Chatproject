import { createReducer, on } from '@ngrx/store';
import { Messages, State } from '../messages';
import { retrieveMessagesSuccess, setMessages } from './messages.actions';

const initialState: Messages[] = [];
// const initialState: State = {
//   chats: []
// };

const _messageReducer = createReducer(
  initialState,

  on(retrieveMessagesSuccess, (state, payload) => {
    console.log('Reducer for http calls', state, payload.chats);
    return [...state, ...payload.chats];
  })
);

export function messageReducer(state, action) {
  return _messageReducer(state, action);
}
