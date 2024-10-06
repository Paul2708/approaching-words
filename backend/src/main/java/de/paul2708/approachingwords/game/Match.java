package de.paul2708.approachingwords.game;

import de.paul2708.approachingwords.messages.out.LockedInMessage;
import de.paul2708.approachingwords.messages.out.MatchFoundMessage;
import de.paul2708.approachingwords.messages.out.RevealMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

public class Match {

    private static final Logger log = LoggerFactory.getLogger(Match.class);

    private final Player firstPlayer;
    private final Player secondPlayer;

    private String firstPlayerGuess;
    private String secondPlayerGuess;

    public Match(Player firstPlayer, Player secondPlayer) {
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
    }

    public void start() {
        log.info("Starting game with {} and {}", firstPlayer.getUsername(), secondPlayer.getUsername());

        firstPlayer.sendMessage(new MatchFoundMessage(secondPlayer.getUsername()));
        secondPlayer.sendMessage(new MatchFoundMessage(firstPlayer.getUsername()));
    }

    public void guess(Player player, String word) {
        if (player.equals(firstPlayer)) {
            firstPlayerGuess = word;
            secondPlayer.sendMessage(new LockedInMessage());
        } else {
            secondPlayerGuess = word;
            firstPlayer.sendMessage(new LockedInMessage());
        }

        if (firstPlayerGuess != null && secondPlayerGuess != null) {
            if (firstPlayerGuess.equalsIgnoreCase(secondPlayerGuess)) {
                firstPlayer.sendMessage(new RevealMessage(secondPlayerGuess, RevealMessage.GameState.ENDED));
                secondPlayer.sendMessage(new RevealMessage(firstPlayerGuess, RevealMessage.GameState.ENDED));
            } else {
                firstPlayer.sendMessage(new RevealMessage(secondPlayerGuess, RevealMessage.GameState.CONTINUE));
                secondPlayer.sendMessage(new RevealMessage(firstPlayerGuess, RevealMessage.GameState.CONTINUE));
            }

            firstPlayerGuess = null;
            secondPlayerGuess = null;
        }
    }

    public Set<Player> getPlayers() {
        return Set.of(firstPlayer, secondPlayer);
    }
}