const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow() {
    //create the browser window.

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.webContents.openDevTools();

    //and load the index.html of the app.
    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

//Quit when all window are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('app-loaded', (event) => {
    console.log('received app-loadin')
    event.returnValue = { data: [] }
})