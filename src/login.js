// login-renderer.js
const { ipcRenderer } = require("electron");
const mysql = require("mysql");

document.addEventListener("DOMContentLoaded", () => {
  const connection = mysql.createConnection({
    host: "127.0.0.1", // Cambia esto por la dirección de tu base de datos
    user: "root",
    password: "",
    database: "gestion_info",
  });
  connection.connect();

  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const query = `SELECT * FROM tusuario WHERE nif = ? AND password = ?;`;
    connection.query(query, [username, password], (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }

      if (results.length > 0) {
        const rolName = results[0].rolName;
        console.log(username, password);
        ipcRenderer.send("login-successful", { rolName });
        console.log("Evento 'login-successful' enviado con rol:", rolName);
      } else {
        console.log("Credenciales incorrectas");
        connection.end(); // Cierra la conexión
      }
    });
  }

  function cancel() {
    console.log("Cancelando");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

  document.getElementById("okButton").addEventListener("click", login);
  document.getElementById("cancelButton").addEventListener("click", cancel);
});
