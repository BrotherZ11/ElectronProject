// En main.js
const { BrowserWindow, ipcMain, app } = require("electron");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("src/pages/login.html");

  // Manejar el evento de inicio de sesión exitoso
  ipcMain.on("login-successful", (event, data) => {
    mainWindow.loadFile("src/pages/muestras.html");
    setTimeout(() => {
      mainWindow.webContents.send("user-role", data);
    }, 1000); // Agrega un retraso de 1 segundo
  });
  // Añadir el manejo del evento "user-role"
  ipcMain.on("user-role", (event, data) => {
    const rolName = data.rolName;
    console.log("Evento 'user-role' recibido con rol:", rolName);
  });
  ipcMain.on("cargar-pagina-login", () => {
    mainWindow.loadFile("src/pages/login.html");
  });
  ipcMain.on("cerrar-aplicacion", () => {
    // Cerrar la aplicación
    app.quit();
  });
}
// app.whenReady().then(createWindow);
module.exports = { createWindow };
