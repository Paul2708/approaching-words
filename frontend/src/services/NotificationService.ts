class NotificationService {

    requestPermission(): void {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notifications.");
        } else {
            if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        console.log("Notification permission granted.");
                    } else {
                        console.log("Notification permission denied.");
                    }
                });
            }
        }
    }

    send(title: string, description: string): void {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notifications.");
        } else {
            if (Notification.permission === "granted") {
                new Notification(title, {
                    body: description,
                });
            }
        }
    }
}

const notificationService = new NotificationService();
export default notificationService;
