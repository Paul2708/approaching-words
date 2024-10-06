package de.paul2708.approachingwords.messages.in;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.paul2708.approachingwords.game.MessageHandler;
import de.paul2708.approachingwords.game.Player;

public class WordGuessMessage extends IncomingMessage {

    @JsonProperty("word")
    private String word;

    public WordGuessMessage() {
        super();
    }

    public WordGuessMessage(String session, String word) {
        super("WORD_GUESS", session);

        this.word = word;
    }

    @Override
    public void handle(Player player, MessageHandler handler) {
        handler.onGuess(player, this);
    }

    public String getWord() {
        return word;
    }
}
