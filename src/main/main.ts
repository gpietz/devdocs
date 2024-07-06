import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import { createMainMenu } from './main_menu';
import '../shared/electron_extensions';

let mainWindow: BrowserWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 1024,
        backgroundColor: '#1f1f1f',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Set main menu
    const mainMenu = createMainMenu(mainWindow);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadFile(path.join(__dirname,  '../views/index.html'));
    mainWindow.addShowOnReady();
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
