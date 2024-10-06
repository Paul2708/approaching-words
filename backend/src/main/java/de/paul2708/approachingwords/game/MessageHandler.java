package de.paul2708.approachingwords.game;

import de.paul2708.approachingwords.messages.in.JoinQueueMessage;
import de.paul2708.approachingwords.messages.in.WordGuessMessage;

public interface MessageHandler {

    void onJoin(Player player, JoinQueueMessage message);

    void onGuess(Player player, WordGuessMessage message);
}
