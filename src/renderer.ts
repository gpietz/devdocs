import { ipcRenderer, IpcRendererEvent } from 'electron';

function updateStatusBar(message: string): void {
    const statusBarElement = document.getElementById('statusBar');
    if (statusBarElement) {
        statusBarElement.textContent = message;
    }
}

// Receive messages from main process
ipcRenderer.on('update-status', (_event: IpcRendererEvent, message: string) => {
    updateStatusBar(message);
});

// Export function
export { updateStatusBar };
