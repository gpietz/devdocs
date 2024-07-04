import { Menu, MenuItem, BrowserWindow } from 'electron';
import { showInfoDialog } from './dialogs';

export function createMainMenu(mainWindow: BrowserWindow): Menu {
    const menuTemplate: (Electron.MenuItemConstructorOptions | MenuItem)[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    click: () => {

                    }
                },
                {
                    label: 'Open',
                    click: () => {

                    }
                },
                { type: 'separator' },
                { role: 'quit' },
            ],

        },
        {
            label: 'Info',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        showInfoDialog(mainWindow, 'DevDocs - A simple electron test application', 'About DevDocs');
                    }
                }
            ]
        }
    ];

    return Menu.buildFromTemplate(menuTemplate)
}
