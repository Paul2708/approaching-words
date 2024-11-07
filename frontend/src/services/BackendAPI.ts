import webSocketService from "./WebSocketService.js";

interface JoinQueueMessage {
    type: 'JOIN_QUEUE';
    username: string;
    session: string;
}

interface WordGuessMessage {
    type: 'WORD_GUESS';
    word: string;
    session: string;
}

let sessionId: string | undefined;

export function storeSession(session: string): void {
    sessionId = session;
}

export function joinQueue(username: string): void {
    if (sessionId) {
        const message: JoinQueueMessage = {type: 'JOIN_QUEUE', username, session: sessionId};
        webSocketService.sendMessage(JSON.stringify(message));
    } else {
        console.error("Session ID is not set. Cannot join queue.");
    }
}

export function guess(word: string): void {
    if (sessionId) {
        const message: WordGuessMessage = {type: 'WORD_GUESS', word, session: sessionId};
        webSocketService.sendMessage(JSON.stringify(message));
    } else {
        console.error("Session ID is not set. Cannot guess.");
    }
}
export interface MatchFoundMessage {
    type: 'MATCH_FOUND';
    opponent: string;
}

export interface RevealMessage {
    type: 'REVEAL';
    opponent_word: string;
    match_state: "CONTINUE" | "ENDED";
}

export interface SessionMessage {
    type: 'SESSION';
    session: string;
}
