export interface Messages {
  id?: number;
  sender?: {
    name?: string;
    profileImage?: string;
  };
  content?: [];
  read?: boolean;
  date?: string;
}
export interface State {
  chats: Messages[];
}

export interface EnteredMessage {
  id?: number;
  content?: string;
}
