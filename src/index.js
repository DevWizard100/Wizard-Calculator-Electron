const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

const createWindow = () => {
  // Laden der gespeicherten Fenstergröße und -position, falls vorhanden
  let windowBounds;
  try {
    windowBounds = JSON.parse(fs.readFileSync(path.join(__dirname, 'WindowSettings.json')));
  } catch (err) {
    console.error(err);
  }

  // Erstellen des Browserfensters
  mainWindow = new BrowserWindow({
    x: windowBounds ? windowBounds.x : undefined,
    y: windowBounds ? windowBounds.y : undefined,
    width: windowBounds ? windowBounds.width : 800,
    height: windowBounds ? windowBounds.height : 600,
  });

  // Laden der Anwendungs-URL
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Überwachung von Änderungen an der Fenstergröße und -position

  mainWindow.on('close', () => {
    saveWindowBounds();
  });
};

// Funktion zum Speichern der Fenstergröße und -position
const saveWindowBounds = () => {
  try {
    fs.writeFileSync(
      path.join(__dirname, 'WindowSettings.json'),
      JSON.stringify(mainWindow.getBounds())
    );
  } catch (err) {
    console.error(err);
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
