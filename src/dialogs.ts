// dialogs.ts
import { BrowserWindow, dialog } from 'electron';

export function showInfoDialog(parentWindow: BrowserWindow, message: string, title: string = 'Information') {
    dialog.showMessageBox(parentWindow, {
        type: 'info',
        title: title,
        message: message,
        buttons: ['OK']
    });
}
