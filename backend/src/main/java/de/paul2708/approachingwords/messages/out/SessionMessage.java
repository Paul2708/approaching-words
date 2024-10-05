package de.paul2708.approachingwords.messages.out;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SessionMessage extends OutgoingMessage {

    @JsonProperty("session")
    private String session;

    public SessionMessage(String session) {
        super("SESSION");

        this.session = session;
    }

    public String getSession() {
        return session;
    }
}
