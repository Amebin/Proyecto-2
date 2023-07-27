let nombrePaciente;
if (localStorage.getItem('nombrePaciente')) {
  nombrePaciente = JSON.parse(localStorage.getItem('nombrePaciente'));
} else {
  nombrePaciente = [];
}

const tablaBody = document.getElementById('userTableBody');

// Función para guardar los datos actualizados en el LocalStorage
function guardarNombrePaciente() {
  localStorage.setItem('nombrePaciente', JSON.stringify(nombrePaciente));
}

// Función para generar la tabla de turnos
function generarTablaUsuarios() {
  // Limpiamos la tabla antes de volver a generarla
  tablaBody.innerHTML = '';

  if (nombrePaciente.length === 0) {
    const fila = document.createElement('tr');
    fila.innerHTML = `No tienes turnos registrados todavía`;
    tablaBody.appendChild(fila);
  } else {
    let index = 1;
    for (let turno of nombrePaciente) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index}</td>
        <td>${turno.fechaTurno}</td>
        <td>${turno.horarios}</td>
        <td>${turno.especialidad ? 'clínico' : 'xd'}</td>
        <td>
          <button class="btn btn-danger btn-sm mr-2" onclick="eliminarTurno(${index - 1})">Eliminar</button>
          <button class="btn btn-primary btn-sm" onclick="modificarTurno(${index - 1})">Modificar</button>
        </td>`;
      index++;
      tablaBody.appendChild(fila);
    }
  }
}

// Función para eliminar un turno
function eliminarTurno(index) {
  nombrePaciente.splice(index, 1);
  guardarNombrePaciente();
  generarTablaUsuarios();
}

// Función para modificar un turno
function modificarTurno(index) {
  const turno = nombrePaciente[index];
  turno.especialidad = !turno.especialidad; // Cambia el valor de 'especialidad' entre true y false
  turno.medico = turno.especialidad ? 'clínico' : 'xd'; // Cambia el valor del médico según 'especialidad'
  guardarNombrePaciente();
  generarTablaUsuarios();
}

// Generamos la tabla de turnos al cargar la página
generarTablaUsuarios();
