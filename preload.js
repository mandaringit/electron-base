const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(title, body) {
      const notification = new Notification(title, { body });
      return notification;
    },
  },
});
