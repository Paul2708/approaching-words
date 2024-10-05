package de.paul2708.approachingwords.messages.in;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.paul2708.approachingwords.game.MessageHandler;
import de.paul2708.approachingwords.game.Player;

public class JoinQueueMessage extends IncomingMessage {

    @JsonProperty("username")
    private String username;

    public JoinQueueMessage() {
        super();
    }


    public JoinQueueMessage(String username, String session) {
        super("JOIN_QUEUE", session);

        this.username = username;
    }

    @Override
    public void handle(Player player, MessageHandler handler) {
        handler.onJoin(player, this);
    }

    public String getUsername() {
        return username;
    }
}
