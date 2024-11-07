class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = {};
    }

    connect(url) {
        this.socket = new WebSocket(url);

        this.socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            this.notifyListeners(data);
        };

        this.socket.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    subscribe(eventType, callback) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    unsubscribe(eventType, callback) {
        if (!this.listeners[eventType]) return;
        this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    }

    notifyListeners(data) {
        const eventType = data.type; // assuming each WebSocket message has a `type` field
        const listeners = this.listeners[eventType] || [];
        listeners.forEach(callback => callback(data));
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
