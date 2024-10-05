package de.paul2708.approachingwords.game;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.InetSocketAddress;

public class GameServer extends WebSocketServer {

    private static final Logger log = LoggerFactory.getLogger(GameServer.class);

    private final GameManager gameManager;

    public GameServer(GameManager gameManager) {
        super(new InetSocketAddress("0.0.0.0", 8000));

        this.gameManager = gameManager;
    }

    @Override
    public void onStart() {
        log.info("WebSocket server started successfully.");
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        log.info("New client '{}' connected.", handshake.getResourceDescriptor());

        gameManager.createNewSession(conn);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        log.debug("received message from {}: {}", conn.getRemoteSocketAddress(), message);

        gameManager.handleReceivedMessage(message);
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        log.info("closed {} with exit code {} additional info: {}", conn.getRemoteSocketAddress(), code, reason);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        log.error("an error occurred on connection {}:", conn.getRemoteSocketAddress(), ex);
    }
}
