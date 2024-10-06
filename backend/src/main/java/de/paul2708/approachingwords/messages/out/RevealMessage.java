package de.paul2708.approachingwords.messages.out;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RevealMessage extends OutgoingMessage {

    @JsonProperty("opponent_word")
    private String opponentWord;

    @JsonProperty("match_state")
    private GameState state;

    public RevealMessage() {
        super("REVEAL");
    }

    public RevealMessage(String opponentWord, GameState gameState) {
        super("REVEAL");

        this.opponentWord = opponentWord;
        this.state = gameState;
    }

    public static enum GameState {
        CONTINUE,
        ENDED
    }
}
