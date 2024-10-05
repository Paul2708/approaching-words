package de.paul2708.approachingwords;

import de.paul2708.approachingwords.game.GameManager;
import de.paul2708.approachingwords.game.GameServer;
import org.java_websocket.server.WebSocketServer;

public class Main {

    public static void main(String[] args) {
        GameManager gameManager = new GameManager();
        WebSocketServer socketServer = new GameServer(gameManager);
        socketServer.start();
    }
}