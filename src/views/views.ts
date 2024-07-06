import { ipcRenderer, IpcRendererEvent } from 'electron';

export function updateStatusBar(message: string): void {
    const statusBarElement = document.getElementById('statusBar');
    if (statusBarElement) {
        statusBarElement.textContent = message;
    }
}

// Receive messages from main process
ipcRenderer.on('update-status', (_event: IpcRendererEvent, message: string) => {
    updateStatusBar(message);
});

export function updateContent(newContent: string) {
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        contentDiv.textContent = newContent;
    }
}
