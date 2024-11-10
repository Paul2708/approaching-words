package de.paul2708.approachingwords.game;

import de.paul2708.approachingwords.messages.Message;
import org.java_websocket.WebSocket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;

public class Player {

    private static final Logger log = LoggerFactory.getLogger(Player.class);
    private final WebSocket socket;
    private final String sessionId;

    private String username;

    public Player(WebSocket socket, String sessionId) {
        this.socket = socket;
        this.sessionId = sessionId;
    }

    public void sendMessage(Message message) {
        if (!socket.isOpen() || socket.isClosing() || socket.isClosed()) {
            log.warn("Tried to send message {} to closed websocket", message.getType());
            return;
        }

        socket.send(message.toJson());
    }

    public boolean matchesConnection(WebSocket connection) {
        return Objects.equals(socket, connection);
    }

    public boolean hasUsername() {
        return username != null;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getSessionId() {
        return sessionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return Objects.equals(sessionId, player.sessionId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(sessionId);
    }
}
