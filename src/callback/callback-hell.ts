//#region
interface User {
  userId: number;
  username: string;
}

const fetchUserData = (username: string, callback: (user: User) => void) => {
  const user: User = {
    userId: 1,
    username,
  };
  callback(user);
};

interface Message {
  uuid: number;
  content: string;
}

const fetchUserMessages = (userId: number, callback: (messages: Message[]) => void) => {
  const messages: Message[] = [
    { uuid: 1, content: 'Hello' },
    { uuid: 2, content: 'World' },
  ];
  callback(messages);
};

const getMessageContent = (uuid: number, callback: (messageContent: string) => void) => {
  const messageContent = 'Hello World';
  callback(messageContent);
};

//#endregion

function findUserComment(username: string, callback: (messageContent: string) => void) {
  fetchUserData(username, (user) => {
    fetchUserMessages(user.userId, (messages) => {
      messages.forEach((message) => {
        getMessageContent(message.uuid, (messageContent) => {
          callback(messageContent);
        });
      });
    });
  });
}
