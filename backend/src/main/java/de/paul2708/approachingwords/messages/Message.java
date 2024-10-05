package de.paul2708.approachingwords.messages;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Message {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @JsonProperty("type")
    private String type;

    public Message() {

    }

    public Message(String type) {
        this.type = type;
    }

    public String toJson() {
        try {
            return OBJECT_MAPPER.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
