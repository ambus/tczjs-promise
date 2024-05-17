"use strict";
const fetchUserData = (username, callback) => {
    const user = {
        userId: 1,
        username,
    };
    callback(user);
};
const fetchUserMessages = (userId, callback) => {
    const messages = [
        { uuid: 1, content: 'Hello' },
        { uuid: 2, content: 'World' },
    ];
    callback(messages);
};
const getMessageContent = (uuid, callback) => {
    const messageContent = 'Hello World';
    callback(messageContent);
};
//#endregion
function findUserComment(username, callback) {
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
