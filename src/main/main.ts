import {app, BrowserWindow, Menu} from 'electron';
import * as path from 'path';
import {createMainMenu} from './main_menu';
import '../shared/electron_extensions';
import {windowStateKeeper} from '../shared/window_state_keeper';

let mainWindow: BrowserWindow;

const createWindow = () => {
    const stateKeeper =  windowStateKeeper('main', {
       defaultWidth: 1280,
       defaultHeight: 1024
    });

    mainWindow = new BrowserWindow({
        x: stateKeeper.x,
        y: stateKeeper.y,
        width: stateKeeper.width,
        height: stateKeeper.height,
        backgroundColor: '#1f1f1f',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (stateKeeper.isMaximized) {
        mainWindow.maximize();
    }

    // Set main menu
    const mainMenu = createMainMenu(mainWindow);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadFile(path.join(__dirname,  '../views/index.html'));
    mainWindow.addShowOnReady();
    mainWindow.on('close', () => {
        stateKeeper.saveState(mainWindow);
    })
    mainWindow.on('closed', () => {
        mainWindow = null!;
    });
};

app.on('ready', () => {
    createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow == null) {
        createWindow();
    }
});
