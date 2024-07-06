import { app, BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

interface WindowState {
    x?: number;
    y?: number;
    width: number;
    height: number;
    isMaximized?: boolean;
}

interface AllWindowStates {
    [key: string]: WindowState
}

interface WindowStateOptions {
    defaultWidth?: number;
    defaultHeight?: number;
}

const stateFilePath = path.join(app.getPath('userData'), 'window-states.json');

function loadAllStates(): AllWindowStates {
    try {
        return JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    } catch (e) {
        return {};
    }
}

function saveAllStates(states: AllWindowStates) {
    fs.writeFileSync(stateFilePath, JSON.stringify(states, null, 2));
}

let allStates = loadAllStates();

export function windowStateKeeper(windowName: string, options: WindowStateOptions = {}) {
    const defaultState: WindowState = {
        width: options.defaultWidth || 800,
        height: options.defaultHeight || 600
    };

    let state = allStates[windowName] || defaultState;

    const stateFilePath = path.join(app.getPath('userData'), `${windowName}-window-state.json`);

    function saveState(win: BrowserWindow) {
        if (!win.isMaximized() && !win.isMinimized()) {
            const bounds = win.getBounds();
            state = { ...bounds, isMaximized: false };
        } else {
            state.isMaximized = win.isMaximized();
        }
        allStates[windowName] = state;
        saveAllStates(allStates);
    }

    return {
        get x() { return state.x; },
        get y() { return state.y; },
        get width() { return state.width; },
        get height() { return state.height; },
        get isMaximized() { return state.isMaximized; },
        saveState
    };
}