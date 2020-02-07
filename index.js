const { app, BrowserWindow, ipcMain } = require('electron');
const rclone = require('./rclone');

function createWindow () {
	let win = new BrowserWindow({
		width: 350,
		height: 500,
		webPreferences: {
		  nodeIntegration: true
		}
	});

	win.loadFile('ui/index.html');
}

app.whenReady().then(createWindow);

app.on('ls-req', async pathSegments => {
	app.emit('ls-res', await rclone.ls(pathSegments))
});
