import { BrowserWindow } from "electron";

declare module 'electron' {
    interface BrowserWindow {
        addShowOnReady(): void;
        addEscapeHandler(): void;
    }
}

BrowserWindow.prototype.addShowOnReady = function() {
    this.once('ready-to-show', () => {
        this.show();
    })
}

BrowserWindow.prototype.addEscapeHandler = function () {
    this.webContents.on('before-input-event', (event, input) => {
        if (input.key == 'Escape') {
            this.close();
        }
    })
}
