import webSocketService from "./WebSocketService.js";

export var sessionId;

export function setSession(session) {
    sessionId = session
}

export function joinQueue(username) {
    const message = {type: 'JOIN_QUEUE', username: username, session: sessionId};
    webSocketService.sendMessage(message);
}

export function guess(word) {
    const message = {type: 'WORD_GUESS', word: word, session: sessionId};
    webSocketService.sendMessage(message);
}
