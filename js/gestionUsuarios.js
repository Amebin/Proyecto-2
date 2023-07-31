let ListaMedicos;
if (localStorage.getItem('ListaMedicos')) {
  ListaMedicos = JSON.parse(localStorage.getItem('ListaMedicos'));
} else {
  ListaMedicos = [];
}

const tablaUsuarios = document.getElementById('tablaUsuarios');

// Función para guardar los datos actualizados en el LocalStorage
function guardarListaMedicos() {
  localStorage.setItem('ListaMedicos', JSON.stringify(ListaMedicos));
}

// Función para generar la tabla de turnos
function generarTablaUsuarios() {
  // Limpiamos la tabla antes de volver a generarla
  tablaUsuarios.innerHTML = '';

  if (ListaMedicos.length === 0) {
    const fila = document.createElement('tr');
    fila.innerHTML = `No tienes turnos registrados todavía`;
    tablaUsuarios.appendChild(fila);
  } else {
    let index = 1;
    for (let usuario of ListaMedicos) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td class="table-secondary">${index}</td>
        <td class="table-secondary d-none d-sm-block h-100" >${usuario.nombre}</td>
        <td class="table-secondary">${usuario.documento}</td>
        <td class="table-secondary">${usuario.activo ? 'true' : 'false'}</td>
        <td class="table-secondary">
          <button class="btn btn-danger btn-sm mr-2" onclick="eliminarUsuario(${index - 1})"><i class="bi bi-trash"></i></button>
          <button class="btn btn-primary btn-sm" onclick="modificarUsuario(${index - 1})"><i class="bi bi-pencil-square"></i></button>
        </td>`;
      index++;
      tablaUsuarios.appendChild(fila);
    }
  }
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
  ListaMedicos.splice(index, 1);
  guardarListaMedicos();
  generarTablaUsuarios();
}

// Función para modificar un usuario
function modificarUsuario(index) {
  const usuario = ListaMedicos[index];
  usuario.activo = !usuario.activo; // Cambia el valor de 'especialidad' entre true y false
  guardarListaMedicos();
  generarTablaUsuarios();
}

// Generamos la tabla de turnos al cargar la página
generarTablaUsuarios();
