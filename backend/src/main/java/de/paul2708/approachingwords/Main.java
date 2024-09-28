package de.paul2708.approachingwords;

import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public class Main {

    public static void main(String[] args) {
        WebSocketServer socketServer = new BackendServer(new InetSocketAddress("0.0.0.0", 8000));
        socketServer.run();
    }
}