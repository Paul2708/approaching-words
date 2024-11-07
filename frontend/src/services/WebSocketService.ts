type EventCallback = (data: string) => void;

class WebSocketService {
    private socket: WebSocket | null = null;
    private listeners: Record<string, EventCallback[]> = {};

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onmessage = (message: MessageEvent) => {
            console.log("RECEIVED Message:")
            console.log(message.data)

            const parsedObject = JSON.parse(message.data);
            this.notifyListeners(parsedObject);
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

    subscribe(eventType: string, callback: EventCallback): void {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    unsubscribe(eventType: string, callback: EventCallback): void {
        if (!this.listeners[eventType]) return;
        this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    }

    private notifyListeners(data): void {
        const eventType = data.type;
        const listeners = this.listeners[eventType] || [];
        listeners.forEach(callback => callback(JSON.stringify(data)));
    }

    sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error("WebSocket is not open. Unable to send message.");
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
