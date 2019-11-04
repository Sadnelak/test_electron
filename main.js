
'use strict'
const { app, BrowserWindow } = require('electron')

let mainWindow;

const fs = require('fs');

var ipcMain = require('electron').ipcMain;

function createWindow () {
  	mainWindow = new BrowserWindow({webPreferences: {
		nodeIntegration: true
		},
		width: 1800, 
		height: 1200}
	); // on définit une taille pour notre fenêtre
    mainWindow.setMenu(null);     
	mainWindow.webContents.openDevTools()
  	mainWindow.loadURL(`file://${__dirname}/index.html`); // on doit charger un chemin absolu
  	mainWindow.on('closed', () => {
	    mainWindow = null;
	});
	fs.readFile("./conf.json", 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
    	global.conf = JSON.parse(data);
        // Change how to handle the file content
        console.log("The file content is : " + data);
    });
	
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

