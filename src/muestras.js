const { ipcRenderer } = require("electron");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1", // Cambia esto por la dirección de tu base de datos
  user: "root",
  password: "",
  database: "gestion_info",
});
connection.connect();

ipcRenderer.on("user-role", (event, data) => {
  const userRole = data.rolName;
  console.log("el rol es 'user-role:", userRole);
  switch (userRole) {
    case "Invitado":
      // Deshabilitar la capacidad de insertar, modificar y borrar
      console.log("Invitado");
      disableInsertModifyDelete();
      break;
    case "Usuario":
      // Deshabilitar la capacidad de insertar y borrar, pero permitir modificar
      console.log("Usuario");
      disableInsertDelete();
      break;
    case "Administrador":
      // Permitir todas las operaciones
      console.log("Admin");
      enableAllOperations();
      break;
    default:
      console.error("Rol de usuario no reconocido:", userRole);
  }
});

function disableInsertModifyDelete() {
  // Lógica para deshabilitar la capacidad de insertar, modificar y borrar
  console.log("disableInsertModifyDelete");
  document.getElementById("insertarButton").disabled = true;
  document.getElementById("borrarButton").disabled = true;
  document.getElementById("actualizarButton").disabled = true;
}

function disableInsertDelete() {
  // Lógica para deshabilitar la capacidad de insertar y borrar
  console.log("disableInsertDelete");

  document.getElementById("insertarButton").disabled = true;
  document.getElementById("borrarButton").disabled = true;
}

function enableAllOperations() {
  // Lógica para permitir todas las operaciones
  console.log("enableAllOperations");
  document.getElementById("insertarButton").disabled = false;
  document.getElementById("borrarButton").disabled = false;
  document.getElementById("actualizarButton").disabled = false;
}
function actualizarValores() {
  var listbox = document.getElementById("solucion");

  const query = "select * from tSolucion;";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }

    // Limpiar las opciones existentes
    listbox.innerHTML = "";

    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        var nuevoValor = document.createElement("option");
        nuevoValor.text = results[i].Solucion;
        nuevoValor.value = results[i].ID;
        listbox.add(nuevoValor);
      }
    }
  });
}

actualizarValores();

function insertar() {
  const id = document.getElementById("id").value;
  const nif = document.getElementById("nif").value;
  const cultivo = document.getElementById("cultivo").value;
  const solucion = document.getElementById("solucion").value;

  const query =
    "INSERT INTO tmuestra (ID, NIF_Paciente, Cultivo, Solucion) VALUES (?, ?, ?, ?);";
  connection.query(
    query,
    [id, nif, cultivo, solucion],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("Muestra insertada correctamente");
      location.reload();
    }
  );
}
window.insertar = insertar;
function borrar() {
  const id = document.getElementById("id").value;

  const query = "DELETE FROM tmuestra WHERE ID = ?;";
  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log("Muestra borrada correctamente");
    location.reload();
  });
}
window.borrar = borrar;
function actualizar() {
  const id = document.getElementById("id").value;
  const nif = document.getElementById("nif").value;
  const cultivo = document.getElementById("cultivo").value;
  const solucion = document.getElementById("solucion").value;

  const query =
    "UPDATE tmuestra SET NIF_Paciente = ?, Cultivo = ?, Solucion = ? WHERE ID = ?;";
  connection.query(
    query,
    [nif, cultivo, solucion, id],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("Muestra actualizada correctamente");
      location.reload();
    }
  );
}
window.actualizar = actualizar;

function limpiar() {
  // Vaciar el contenido de las cajas de texto
  document.getElementById("id").value = "";
  document.getElementById("nif").value = "";
  document.getElementById("cultivo").value = "";
  document.getElementById("solucion").value = "";
}
// Agregar la función limpiar al ámbito global
window.limpiar = limpiar;

function salir() {
  console.log("Saliendo");
  // Enviar mensaje para cargar la página de login
  ipcRenderer.send("cargar-pagina-login");

  // Cerrar la aplicación
  //ipcRenderer.send("cerrar-aplicacion");
}
// Agregar la función salir al ámbito global
window.salir = salir;

function mostrarMuestras(results) {
  const datagridContainer = document.querySelector(".datagrid-container");

  // Limpiar el contenido existente
  datagridContainer.innerHTML = "";

  // Crear la tabla
  const table = document.createElement("table");
  table.classList.add("muestras-table");

  // Crear la fila de encabezado
  const headerRow = document.createElement("tr");
  const headerColumns = ["ID", "NIF", "Cultivo", "Solución"];

  headerColumns.forEach((columnText) => {
    const th = document.createElement("th");
    th.textContent = columnText;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  // Crear las filas de datos
  results.forEach((muestras) => {
    const row = document.createElement("tr");

    // Crear las celdas de datos
    const cells = ["ID", "NIF_Paciente", "Cultivo", "Solucion"];

    cells.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = muestras[cell];
      row.appendChild(td);
    });

    // Agregar un evento de clic a cada fila
    row.addEventListener("click", () => {
      // Llenar los campos de texto con los valores de la fila seleccionada
      document.getElementById("id").value = muestras.ID;
      document.getElementById("nif").value = muestras.NIF_Paciente;
      document.getElementById("cultivo").value = muestras.Cultivo;
      document.getElementById("solucion").value = muestras.Solucion;
    });

    table.appendChild(row);
  });

  // Agregar la tabla al contenedor
  datagridContainer.appendChild(table);
}

// Función para obtener y mostrar las muestras
function obtenerYMostrarMuestras() {
  const query = "SELECT * FROM tmuestra;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }

    mostrarMuestras(results);
  });
}
obtenerYMostrarMuestras();
