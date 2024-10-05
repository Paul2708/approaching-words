package de.paul2708.approachingwords.game;

import de.paul2708.approachingwords.messages.out.MatchFoundMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Match {

    private static final Logger log = LoggerFactory.getLogger(Match.class);
    private final Player firstPlayer;
    private final Player secondPlayer;

    public Match(Player firstPlayer, Player secondPlayer) {
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
    }

    public void start() {
        log.info("Starting game with {} and {}", firstPlayer.getUsername(), secondPlayer.getUsername());

        firstPlayer.sendMessage(new MatchFoundMessage(secondPlayer.getUsername()));
        secondPlayer.sendMessage(new MatchFoundMessage(firstPlayer.getUsername()));
    }
}