package de.paul2708.approachingwords.game;

import de.paul2708.approachingwords.messages.in.JoinQueueMessage;

public interface MessageHandler {

    void onJoin(Player player, JoinQueueMessage message);
}
