const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path');

let currWin = undefined;

function createWindow() {
    if (currWin !== undefined) {
        return;
    }
    // Create the browser window.
    currWin = new BrowserWindow({
        title: "SymbA",
        frame: false,
        maxWidth: 800,
        maxHeight: 400,
        minWidth: 800,
        minHeight: 400,
        width: 800,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    })
    currWin.removeMenu();
    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, './index.html')}`;
    currWin.loadURL(startUrl);
}

function closeWindow() {
    currWin.close();
    currWin = undefined;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    globalShortcut.register("Ctrl+Alt+Space", () => {
        if (currWin === undefined) {
            createWindow();
        } else {
            closeWindow();
        }
    })
}).then(createWindow)

app.on("browser-window-blur", () => {
    closeWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.dock.hide();
