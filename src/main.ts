import { app, BrowserWindow, Menu, dialog } from 'electron';
import * as path from 'path';
import { createMainMenu } from './main_menu';

let mainWindow: BrowserWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Set main menu
    const mainMenu = createMainMenu(mainWindow);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadFile(path.join(__dirname,  '../index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null!;
    });
};

app.on('ready', () => {
    createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow == null) {
        createWindow();
    }
});
