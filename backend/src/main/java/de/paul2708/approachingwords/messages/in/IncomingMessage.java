package de.paul2708.approachingwords.messages.in;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.paul2708.approachingwords.game.MessageHandler;
import de.paul2708.approachingwords.game.Player;
import de.paul2708.approachingwords.messages.Message;

import java.util.Map;

public abstract class IncomingMessage extends Message {

    public static final Map<String, Class<? extends IncomingMessage>> REGISTERED_MESSAGES = Map.of(
            "JOIN_QUEUE", JoinQueueMessage.class
    );

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @JsonProperty("session")
    private String session;

    public IncomingMessage() {
        
    }

    public IncomingMessage(String type, String session) {
        super(type);

        this.session = session;
    }

    public String toJson() {
        try {
            return OBJECT_MAPPER.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public abstract void handle(Player player, MessageHandler handler);

    public String getSession() {
        return session;
    }

    public static <T extends IncomingMessage> T parse(String json, Class<T> clazz) throws JsonProcessingException {
        return OBJECT_MAPPER.readValue(json, clazz);
    }
}
