import { Menu, MenuItem, BrowserWindow } from 'electron';
import {showInfoDialog} from '../shared/dialogs';
import path from "path";

let settingsWindow: BrowserWindow;

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
                {
                    label: 'Settings',
                    click: () => {
                        openSettingsWindow(mainWindow);
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

function openSettingsWindow(mainWindow: BrowserWindow) {
    settingsWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Settings',
        parent: mainWindow,
        modal: true,
        show: false,
        darkTheme: true
    })
    settingsWindow.menuBarVisible = false;
    settingsWindow.loadURL(path.join(__dirname,  '../views/settings.html'));
    settingsWindow.addShowOnReady();
    settingsWindow.addEscapeHandler();
}
