const { contextBridge, clipboard, Notification } = require("electron");

contextBridge.exposeInMainWorld("desktop", {
  copy: (text) => clipboard.writeText(String(text ?? "")),
  notify: (title, body) => {
    try {
      new Notification({ title: String(title ?? "Info"), body: String(body ?? "") }).show();
    } catch (e) {
      // noop
    }
  }
});
