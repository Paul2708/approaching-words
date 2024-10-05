package de.paul2708.approachingwords.messages.out;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MatchFoundMessage extends OutgoingMessage {

    @JsonProperty("opponent")
    private String opponent;

    public MatchFoundMessage() {
        super("MATCH_FOUND");
    }

    public MatchFoundMessage(String opponent) {
        super("MATCH_FOUND");

        this.opponent = opponent;
    }
}
