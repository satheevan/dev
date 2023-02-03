const {app,BrowserWindow} = require('electron')

function createWindow() {
    //create the browser window.

    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        }
    })

//and load the index.html of the app.
    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

//Quit when all window are closed.
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
    })

