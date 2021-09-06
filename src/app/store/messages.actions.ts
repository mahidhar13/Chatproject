import { createAction, props } from '@ngrx/store';
import { EnteredMessage, Messages } from '../messages';

export const RETRIEVE_MESSAGES = '[url messages] load messages';
export const RETRIEVE_MESSAGES_SUCCESS =
  '[url messages] load url messages success';
export const SET_MESSAGES = '[entered messages] add messages';

export const retrieveMessages = createAction(RETRIEVE_MESSAGES);
export const retrieveMessagesSuccess = createAction(
  RETRIEVE_MESSAGES_SUCCESS,
  props<{ chats: Messages[] }>()
);

export const setMessages = createAction(
  SET_MESSAGES,
  props<{ enteredMessages: EnteredMessage[] }>()
);
