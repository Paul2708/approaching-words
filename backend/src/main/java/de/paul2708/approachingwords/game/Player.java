package de.paul2708.approachingwords.game;

import de.paul2708.approachingwords.messages.Message;
import org.java_websocket.WebSocket;

public class Player {

    private final WebSocket socket;
    private final String sessionId;

    private String username;

    public Player(WebSocket socket, String sessionId) {
        this.socket = socket;
        this.sessionId = sessionId;
    }

    public void sendMessage(Message message) {
        socket.send(message.toJson());
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
