package de.paul2708.approachingwords.game;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.paul2708.approachingwords.messages.in.IncomingMessage;
import de.paul2708.approachingwords.messages.in.JoinQueueMessage;
import de.paul2708.approachingwords.messages.in.WordGuessMessage;
import de.paul2708.approachingwords.messages.out.SessionMessage;
import org.java_websocket.WebSocket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class GameManager {

    private static final Logger log = LoggerFactory.getLogger(GameManager.class);

    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

    private final MessageHandler messageHandler;

    private final Map<String, Player> sessions;
    private Player waitingPlayer;
    private final Set<Match> matches;

    public GameManager() {
        this.messageHandler = new MessageHandler() {

            @Override
            public void onJoin(Player player, JoinQueueMessage message) {
                if (player.hasUsername()) {
                    log.warn("Player {} tried to join the queue a second time", message.getUsername());
                    return;
                }

                // TODO: Validate username

                log.debug("Received new join queue message: {}", message.getUsername());

                player.setUsername(message.getUsername());

                synchronized (this) {
                    if (waitingPlayer == null) {
                        waitingPlayer = player;
                    } else {
                        Match match = new Match(waitingPlayer, player);
                        matches.add(match);

                        match.start();
                        waitingPlayer = null;
                    }
                }
            }

            @Override
            public void onGuess(Player player, WordGuessMessage message) {
                Match match = findMatch(player);
                if (match == null) {
                    log.warn("Could not find match for player {}", player.getSessionId());
                    return;
                }

                match.guess(player, message.getWord());
            }
        };

        this.sessions = new ConcurrentHashMap<>();
        this.waitingPlayer = null;
        this.matches = new HashSet<>();
    }

    public void createNewSession(WebSocket socket) {
        String sessionId = UUID.randomUUID().toString();

        Player player = new Player(socket, sessionId);
        this.sessions.put(sessionId, player);

        player.sendMessage(new SessionMessage(sessionId));
    }

    public void handleReceivedMessage(String receivedMessage) {
        try {
            JsonNode jsonNode = JSON_MAPPER.readTree(receivedMessage);
            if (!jsonNode.has("type") || !jsonNode.has("session")) {
                log.error("Message does not contain 'type' or 'session'.");
                return;
            }

            String type = jsonNode.get("type").asText();
            if (!IncomingMessage.REGISTERED_MESSAGES.containsKey(type)) {
                log.error("The type '{}' is not a registered message type.", type);
                return;
            }

            String session = jsonNode.get("session").asText();
            if (!sessions.containsKey(session)) {
                log.error("The session '{}' does not refer to a player.", session);
                return;
            }
            Player player = sessions.get(session);

            Class<? extends IncomingMessage> messageClass = IncomingMessage.REGISTERED_MESSAGES.get(type);
            IncomingMessage.parse(receivedMessage, messageClass).handle(player, messageHandler);
        } catch (JsonProcessingException e) {
            log.warn("Received malformed JSON message: {}", e.getMessage());
        }
    }

    private Match findMatch(Player player) {
        for (Match match : matches) {
            if (match.getPlayers().contains(player)) {
                return match;
            }
        }

        return null;
    }
}
